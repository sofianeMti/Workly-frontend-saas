import React from "react";
import { PlatformConnect } from "./platform-connect";

export function PlatformConnections() {
  // Liste des plateformes disponibles
  const platforms = ["google", "trustpilot", "facebook", "yelp"];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {platforms.map((platform) => (
          <PlatformConnect key={platform} platform={platform} />
        ))}
      </div>
    </div>
  );
}
