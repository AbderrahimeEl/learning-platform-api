const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const config = require("./config/env");
const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");
const lessonRoutes = require('./routes/lessonRoutes');
const userRoutes = require('./routes/userRoutes');
const db = require("./config/db");

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'learning plateform API',
      version: '1.0.0',
      description: 'API for managing courses, lessons, and users',
    },
    servers: [
      {
        url: `http://localhost:${config.port || 3000}`,
        description: 'Development server',
      },
    ],
  
  },
  apis: ['src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

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
    app.listen(PORT, '0.0.0.0', () => {
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