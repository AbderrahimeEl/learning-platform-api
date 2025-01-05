// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :
const db = require("../config/db");
// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl = 3600) {
  try {
    const redisClient = db.getRedisClient();
    await redisClient.set(key, JSON.stringify(data), "EX", ttl);
    return true;
  } catch (error) {
    console.error("Redis cache error:", error);
    return false;
  }
}

async function getCachedData(key) {
  try {
    const redisClient = db.getRedisClient();
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Redis get error:", error);
    return null;
  }
}

module.exports = {
  // TODO: Exporter les fonctions utilitaires
  cacheData,
  getCachedData,
};
