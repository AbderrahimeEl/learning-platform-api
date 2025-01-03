// Question: Comment organiser le point d'entrée de l'application ?
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?

const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');
// const studentRoutes = require('./routes/studentRoutes');

const app = express();

function configureRoutes(app) {
    // Montez les routes ici
    app.use('/api/courses', courseRoutes);
  }

async function startServer() {
  try {
    // TODO: Initialiser les connexions aux bases de données
    await db.connectMongo();
    await db.connectRedis();
    // TODO: Configurer les middlewares Express
    // TODO: Monter les routes
    configureRoutes(app);
    // Démarrer le serveur
    const PORT = config.port || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  // TODO: Implémenter la fermeture propre des connexions
  console.log('Shutting down gracefully...');
  await db.closeConnections();

});

startServer();