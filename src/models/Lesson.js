const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 20,
  },
  duration: {
    type: Number, 
    required: true,
    min: 1,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;