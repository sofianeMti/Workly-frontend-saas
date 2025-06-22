import React from "react";
import { PlatformConnections } from "../components/platform-connections";

const SettingPage = () => {
  return (
    <div className="flex flex-col gap-8 py-4 md:gap-10 md:py-6 p-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Connexions aux plateformes
        </h1>
        <p className="text-muted-foreground mt-2">
          Connectez-vous à vos plateformes d'avis pour importer et gérer vos
          avis clients.
        </p>
      </div>

      <PlatformConnections />
    </div>
  );
};

export default SettingPage;
