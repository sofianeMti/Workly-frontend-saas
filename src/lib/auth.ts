import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000/api/auth", // Chemin complet incluant /api/auth
  fetchOptions: {
    credentials: "include", // Important pour les cookies d'authentification
  },
});
