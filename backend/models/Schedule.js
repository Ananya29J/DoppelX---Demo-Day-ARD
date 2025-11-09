import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    default: 'My Schedule'
  },
  tasks: [{
    name: String,
    startTime: String,
    endTime: String,
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    }
  }],
  date: {
    type: Date,
    default: Date.now
  },
  isGenerated: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Schedule', scheduleSchema);

