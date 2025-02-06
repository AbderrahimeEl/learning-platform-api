const redisService = require('../services/redisService');
const Course = require('../models/Course');

async function getCourse(req, res) {
  const id = req.params.id;

  try {
    const cachedCourse = await redisService.getCachedData(`course:${id}`);
    if (cachedCourse) {
      console.log('Cache hit');
      return res.json(cachedCourse);
    }

    console.log('Cache miss');
    const course = await Course.findById(id).populate('lessons');
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    await redisService.cacheData(`course:${id}`, course, 3600);
    res.json(course);
  } catch (error) {
    console.error('Error retrieving course:', error);
    res.status(500).json({ error: 'Error retrieving course', details: error.message });
  }
}

async function getCourses(req, res) {
  try {
    const cachedCourses = await redisService.getCachedData('courses');
    if (cachedCourses) {
      console.log('Cache hit');
      return res.json(cachedCourses);
    }

    console.log('Cache miss');
    const courses = await Course.find({}).populate('lessons');
    await redisService.cacheData('courses', courses, 3600);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving courses', details: error.message });
  }
}

async function createCourse(req, res) {
  try {
    const courseData = req.body;
    const newCourse = await Course.create(courseData);

    await redisService.deleteCachedData('courses');
    res.status(201).json({ message: 'Course created successfully', data: newCourse });
  } catch (error) {
    res.status(500).json({ error: 'Error creating course', details: error.message });
  }
}

async function getCourseStats(req, res) {
  try {
    const cachedStats = await redisService.getCachedData('courses:stats');
    if (cachedStats) {
      console.log('Cache hit');
      return res.json(cachedStats);
    }

    console.log('Cache miss');
    const totalCourses = await Course.countDocuments();
    const durationStats = await Course.aggregate([
      { $group: { _id: '$duration', total: { $sum: 1 } } },
      { $sort: { total: -1 } },
    ]);

    const courseTitles = await Course.find({}, 'title');

    const courseStats = {
      totalCourses,
      durationStats,
      courseTitles: courseTitles.map(course => course.title),
    };

    await redisService.cacheData('courses:stats', courseStats, 3600);
    res.status(200).json(courseStats);
  } catch (error) {
    console.error('Failed to get course stats:', error);
    res.status(500).json({ error: 'Failed to get course stats', details: error.message });
  }
}

async function updateCourse(req, res) {
  const id = req.params.id;
  const updates = req.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate('lessons');

    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    await redisService.deleteCachedData(`course:${id}`);
    await redisService.deleteCachedData('courses');
    res.json({ message: 'Course updated successfully', data: updatedCourse });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Error updating course', details: error.message });
  }
}

async function deleteCourse(req, res) {
  const id = req.params.id;

  try {
    const result = await Course.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: 'Course not found' });
    }

    await redisService.deleteCachedData(`course:${id}`);
    await redisService.deleteCachedData('courses');
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Error deleting course', details: error.message });
  }
}

module.exports = {
  getCourse,
  getCourses,
  createCourse,
  getCourseStats,
  updateCourse,
  deleteCourse,
};
