import React from "react";
import { Button } from "../common/Button";
import { Inbox, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import emailApi from "../../api/emailApi";

const GOOGLE_AUTH_URL = "http://localhost:3000/api/email/auth/google";

export default function ConnectEmailButton({ variant = "default", className = "", onSuccess = null }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const navigate = useNavigate();
  
  // Fonction pour vérifier le statut de connexion email
  const checkConnectionStatus = async () => {
    try {
      const status = await emailApi.checkEmailConnection();
      console.log("Statut de connexion email:", status);
      
      setIsConnected(status.connected);
      setProvider(status.provider);
      
      if (status.connected && onSuccess) {
        onSuccess(status);
      }
      return status.connected;
    } catch (error) {
      console.error("Erreur lors de la vérification du statut de connexion email:", error);
      setIsConnected(false);
      setProvider(null);
      return false;
    }
  };
  
  // Vérifier le statut au chargement du composant
  useEffect(() => {
    checkConnectionStatus();
  }, []);

  const handleConnectEmail = async () => {
    setIsLoading(true);
    
    try {
      // Vérifier d'abord si l'utilisateur est déjà connecté
      const isConnected = await checkConnectionStatus();
      if (isConnected) {
        setIsLoading(false);
        navigate("/subscribe/analyzing");
        return;
      }
      
      // Ouvrir une nouvelle fenêttre pour l'authentification OAuth
      const width = 600;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      // Utiliser l'URL d'authentification directe
      const authWindow = window.open(
        GOOGLE_AUTH_URL,
        "Connexion Gmail",
        `width=${width},height=${height},left=${left},top=${top}`
      );
      
      if (!authWindow) {
        console.error("La fenêtre popup a été bloquée par le navigateur");
        setIsLoading(false);
        return;
      }
      
      // Vérifier si la fenêtre est fermée
      const checkWindowClosed = setInterval(async () => {
        if (authWindow.closed) {
          clearInterval(checkWindowClosed);
          console.log("Fenêtre d'authentification fermée, vérification du statut de connexion...");
          
          // Vérifier si l'authentification a réussi
          const isConnected = await checkConnectionStatus();
          setIsLoading(false);
          
          if (isConnected) {
            console.log("Connexion établie avec succès!");
            navigate("/subscribe/analyzing");
          }
        }
      }, 1000);
      
      // Écouter les messages de la fenêttre popup
      const handleMessage = (event) => {
        // Vérifier l'origine pour la sécurité
        if (event.origin !== window.location.origin) return;
        
        console.log("Message reçu de la popup:", event.data);
        
        if (event.data.type === "GMAIL_AUTH_SUCCESS") {
          if (authWindow && !authWindow.closed) {
            authWindow.close();
          }
          window.removeEventListener("message", handleMessage);
          clearInterval(checkWindowClosed);
          setIsLoading(false);
          
          // Vérifier le statut de connexion et rediriger
          checkConnectionStatus().then(isConnected => {
            if (isConnected) {
              navigate("/subscribe/analyzing");
            }
          });
        } else if (event.data.type === "GMAIL_AUTH_ERROR") {
          if (authWindow && !authWindow.closed) {
            authWindow.close();
          }
          window.removeEventListener("message", handleMessage);
          clearInterval(checkWindowClosed);
          setIsLoading(false);
          console.error("Erreur d'authentification Gmail:", event.data.error);
        }
      };
      
      window.addEventListener("message", handleMessage);
      
      // Nettoyer les écouteurs si le composant est démonté
      return () => {
        window.removeEventListener("message", handleMessage);
        clearInterval(checkWindowClosed);
      };
    } catch (error) {
      console.error("Erreur lors de la connexion à Gmail:", error);
      setIsLoading(false);
    }
  };

  // Fonction pour déconnecter la boîte mail
  const handleDisconnectEmail = async () => {
    setIsLoading(true);
    try {
      await emailApi.revokeEmailAccess();
      setIsConnected(false);
      setProvider(null);
      alert("Votre boîte mail a été déconnectée avec succès.");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fonction pour analyser les abonnements
  const handleAnalyzeSubscriptions = () => {
    navigate("/subscribe/analyzing");
  };
  
  if (isConnected) {
    return (
      <div className="flex flex-col gap-2">
        <div className="text-sm text-green-600 mb-1">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            Boîte mail connectée ({provider})
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleAnalyzeSubscriptions}
          >
            <Inbox className="h-4 w-4" />
            Analyser mes abonnements
          </Button>
          <Button
            variant="ghost"
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={handleDisconnectEmail}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Déconnecter"}
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <Button
      variant={variant}
      className={`flex items-center gap-2 ${className}`}
      onClick={handleConnectEmail}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Inbox className="h-4 w-4" />
      )}
      {isLoading ? "Connexion en cours..." : "Connecter ma boîte mail"}
    </Button>
  );
}
