import { useState } from "react";
import { authClient } from "../api/userApi";
import { useNavigate } from "react-router-dom";

export function useLoginUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const submitLogin = async (data) => {
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      // Utilisation directe du client Better Auth
      const { data: userData, error: authError } = await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: "/dashboard",
          rememberMe: data.rememberMe || false,
        }
      );
      
      if (authError) {
        throw new Error(authError.message || "Erreur de connexion");
      }
      
      setSuccess(true);
      // Better Auth gère automatiquement la session et les cookies
      // Vous pouvez ajouter ici d'autres logiques comme les analytics
      
      // Si vous préférez gérer la redirection manuellement plutôt que via callbackURL
      navigate("/dashboard");
      
      return userData;
    } catch (err) {
      setError(err.message || "Erreur inconnue");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // On expose tout ce qui sert à la gestion côté UI
  return { submitLogin, loading, error, success };
}
