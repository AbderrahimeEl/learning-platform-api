// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function getCourse(req, res) {
  const id = req.params.id;

  try {
    const cachedCourse = await redisService.getCachedData(`course:${id}`);
    if (cachedCourse) {
      console.log('Cache hit');
      return res.json(cachedCourse);
    }

    console.log('Cache miss');
    const course = await mongoService.findOneById('courses', id);
    if (!course) {
      return res.status(404).send('Course not found');
    }
    await redisService.cacheData(`course:${id}`, course, 3600);
    res.json(course);
  } catch (error) {
    console.error('Error retrieving course:', error);
    res.status(500).send('Error retrieving course: ' + error.message);
  }
}

async function getCourses(req, res) {
  try {
    const cachedCourses = await redisService.getCachedData(`courses`);
    if (cachedCourses) {
      console.log("Cache hit");
      return res.json(cachedCourses);
    }
    console.log("Cache miss");
    const courses = await mongoService.findAll('courses');
    await redisService.cacheData(`courses`, courses, 3600);
    res.json(courses);
  } catch (error) {
    res.status(500).send('Error retrieving courses: ' + error.message);
  }
}

async function createCourse(req, res) {
  // Logique pour créer un cours
  try {
    const course = req.body;
    const result = await mongoService.insertOne('courses', course);
    res.json(result);
  } catch (error) {
    res.status(500).send('Error creating course: ' + error.message);
  }
}


module.exports = {
  getCourse,
  getCourses,
  createCourse,
};