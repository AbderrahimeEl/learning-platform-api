const express = require("express");
const config = require("./config/env");
const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");
const lessonRoutes = require('./routes/lessonRoutes');
const userRoutes = require('./routes/userRoutes');
const db = require("./config/db");

const app = express();

function configureRoutes(app) {
  app.use("/api/courses", courseRoutes);
  app.use("/api/courses", lessonRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
}

async function startServer() {
  try {
    await db.connectMongo();
    await db.connectRedis();

    app.use(express.json());
    configureRoutes(app);

    const PORT = config.port || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await db.closeConnections();
  
});

startServer();