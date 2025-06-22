import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Search } from "lucide-react";

export function PlatformConnect({ platform }) {
  const [isConnected, setIsConnected] = useState(false);

  // Configuration des plateformes
  const platformConfig = {
    google: {
      name: "Google",
      description: "Connectez-vous pour importer vos avis Google",
      icon: "google",
      color: "bg-red-500",
    },
    trustpilot: {
      name: "Trustpilot",
      description: "Connectez-vous pour importer vos avis Trustpilot",
      icon: "trustpilot",
      color: "bg-green-500",
    },
    facebook: {
      name: "Facebook",
      description: "Connectez-vous pour importer vos avis Facebook",
      icon: "facebook",
      color: "bg-blue-500",
    },
    yelp: {
      name: "Yelp",
      description: "Connectez-vous pour importer vos avis Yelp",
      icon: "yelp",
      color: "bg-red-600",
    },
  };

  const config = platformConfig[platform] || {
    name: platform,
    description: `Connectez-vous pour importer vos avis ${platform}`,
    icon: "default",
    color: "bg-gray-500",
  };

  const handleConnect = () => {
    // Ici, on simulerait une redirection vers l'OAuth de la plateforme
    console.log(`Connexion à ${config.name}...`);

    // Pour la démo, on simule une connexion réussie
    setTimeout(() => {
      setIsConnected(true);
    }, 1000);
  };

  const handleDisconnect = () => {
    console.log(`Déconnexion de ${config.name}...`);
    setIsConnected(false);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{config.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{config.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-start">
        {platform === "google" ? (
          <Button variant="outline" className="px-4 flex items-center gap-2" onClick={handleConnect}>
            <Search size={16} className="text-red-500" />
            Google Connect
          </Button>
        ) : isConnected ? (
          <Button variant="outline" className="px-4" onClick={handleDisconnect}>
            Déconnecter
          </Button>
        ) : (
          <Button className="px-4" onClick={handleConnect}>
            Connecter
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
