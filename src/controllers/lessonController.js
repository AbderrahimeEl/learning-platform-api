const redisService = require('../services/redisService');
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

async function createLesson(req, res) {
  const { courseId } = req.params;
  const lessonData = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const newLesson = await Lesson.create({ ...lessonData, course: courseId });

    // Update course with new lesson
    course.lessons.push(newLesson._id);
    await course.save();

    await redisService.deleteCachedData(`course:${courseId}`);
    res.status(201).json({ message: 'Lesson created successfully', data: newLesson });
  } catch (error) {
    console.error('Error creating lesson:', error);
    res.status(500).json({ error: 'Error creating lesson', details: error.message });
  }
}

async function getLessonsByCourse(req, res) {
  const { courseId } = req.params;

  try {
    const cachedLessons = await redisService.getCachedData(`course:${courseId}:lessons`);
    if (cachedLessons) {
      console.log('Cache hit');
      return res.json(cachedLessons);
    }

    console.log('Cache miss');
    const lessons = await Lesson.find({ course: courseId });

    await redisService.cacheData(`course:${courseId}:lessons`, lessons, 3600);
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving lessons', details: error.message });
  }
}

async function getLessonById(req, res) {
  const { id } = req.params;

  try {
    const cachedLesson = await redisService.getCachedData(`lesson:${id}`);
    if (cachedLesson) {
      console.log('Cache hit');
      return res.json(cachedLesson);
    }

    console.log('Cache miss');
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    await redisService.cacheData(`lesson:${id}`, lesson, 3600);
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving lesson', details: error.message });
  }
}

async function updateLesson(req, res) {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedLesson = await Lesson.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedLesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    await redisService.deleteCachedData(`lesson:${id}`);
    res.json({ message: 'Lesson updated successfully', data: updatedLesson });
  } catch (error) {
    res.status(500).json({ error: 'Error updating lesson', details: error.message });
  }
}

async function deleteLesson(req, res) {
  const { id } = req.params;

  try {
    const lesson = await Lesson.findByIdAndDelete(id);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    await redisService.deleteCachedData(`lesson:${id}`);
    res.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting lesson', details: error.message });
  }
}

module.exports = {
  createLesson,
  getLessonsByCourse,
  getLessonById,
  updateLesson,
  deleteLesson,
};
