const mongoose = require('mongoose');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  try {
    await mongoose.connect(config.mongodb.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully using Mongoose');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

async function connectRedis() {
  try {
    redisClient = redis.createClient({ url: config.redis.uri });

    redisClient.on('connect', () => {
      console.log('Redis connection successful');
    });

    redisClient.on('error', (err) => {
      console.error('Error connecting to Redis:', err);
    });

    await redisClient.connect();
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    throw error; 
  }
}

function closeConnections() {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
  });
} 

module.exports = {
  connectMongo,
  connectRedis,
  getRedisClient: () => redisClient,
  closeConnections
};