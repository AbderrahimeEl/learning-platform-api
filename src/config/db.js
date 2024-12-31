// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : 
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : 

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  try {
    // TODO: Implémenter la connexion MongoDB
    mongoClient = await MongoClient.connect(config.mongodb.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = mongoClient.db(config.mongodb.dbName);
    console.log('MongoDB connection successful');
  } catch (err) {
    // Gérer les erreurs et les retries
    console.error('Error connecting to MongoDB:', err);
  }
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  redisClient = redis.createClient(config.redis.uri);
  
  redisClient.on('connect', () => {
    console.log('Redis connection successful');
  });
  
  // Gérer les erreurs et les retries
  redisClient.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
  });
}

// Fonction de fermeture des connexions
function closeConnections() {
  if (mongoClient) {
    mongoClient.close();
    console.log('MongoDB connection closed');
  }
  if (redisClient) {
    redisClient.quit();
    console.log('Redis connection closed');
  }
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo,
  connectRedis,
  db,
  redisClient,
  closeConnections
};