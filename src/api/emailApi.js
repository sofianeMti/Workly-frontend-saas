import axios from "axios";

const API_URL = "http://localhost:3000/api/email";

// Instance axios avec credentials pour les cookies d'authentification
const emailApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

/**
 * Vérifie si l'utilisateur a déjà connecté son compte Gmail
 * @returns {Promise<{connected: boolean, provider: string|null}>}
 */
export const checkEmailConnection = async () => {
  try {
    const response = await emailApi.get("/status");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la vérification de la connexion email:", error);
    return { connected: false, provider: null };
  }
};

/**
 * Récupère les abonnements détectés dans les emails
 * @returns {Promise<Array>} Liste des abonnements détectés
 */
export const getDetectedSubscriptions = async () => {
  try {
    const response = await emailApi.get("/subscriptions/detected");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des abonnements:", error);
    throw error;
  }
};

/**
 * Enregistre les abonnements validés par l'utilisateur
 * @param {Array} subscriptions - Liste des abonnements à enregistrer
 * @returns {Promise<Array>} Liste des abonnements enregistrés
 */
export const saveSubscriptions = async (subscriptions) => {
  try {
    const response = await emailApi.post("/subscriptions/save", { subscriptions });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des abonnements:", error);
    throw error;
  }
};

/**
 * Révoque l'accès à la boîte mail
 * @returns {Promise<{success: boolean}>}
 */
export const revokeEmailAccess = async () => {
  try {
    const response = await emailApi.post("/revoke");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la révocation de l'accès email:", error);
    throw error;
  }
};

/**
 * Récupère des informations détaillées sur la boîte mail connectée
 * @returns {Promise<{profile: Object, stats: Object, provider: string}>}
 */
export const getEmailInfo = async () => {
  try {
    const response = await emailApi.get("/info");
    console.log("Informations de la boîte mail:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des informations de la boîte mail:", error);
    throw error;
  }
};

export default {
  checkEmailConnection,
  getDetectedSubscriptions,
  saveSubscriptions,
  revokeEmailAccess,
  getEmailInfo,
};
