import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  studyHours: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    min: 0,
    max: 100
  },
  breaks: {
    type: Number,
    default: 0
  },
  sleepHours: {
    type: Number,
    default: 8
  },
  tasksCompleted: {
    type: Number,
    default: 0
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Activity', activitySchema);

