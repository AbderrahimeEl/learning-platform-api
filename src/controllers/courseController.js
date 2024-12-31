// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :

const { ObjectId } = require("mongodb");
const db = require("../config/db");
const mongoService = require("../services/mongoService");
const redisService = require("../services/redisService");

async function createCourse(req, res) {
  res.send("createCourse");
}

async function getCourse(req, res) {
  // Logique pour obtenir un cours par ID
  res.send("getCourse by ID");
}

async function getCourses(req, res) {
  // Logique pour obtenir les statistiques des cours
  res.send("getCourses");
}

module.exports = {
  createCourse,
  getCourse,
  getCourses,
};
