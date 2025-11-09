import mongoose from 'mongoose';

const doppelgangerAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  analysisDate: {
    type: Date,
    default: Date.now
  },
  studyHours: {
    type: Number,
    required: true
  },
  breaks: {
    type: Number,
    default: 0
  },
  sleepHours: {
    type: Number,
    default: 8
  },
  pastPerformance: {
    type: Number, // average score
    default: 0
  },
  simulatedOutcomes: [{
    scenario: String, // e.g., "2 hours instead of 1"
    predictedScore: Number,
    improvement: Number // percentage improvement
  }],
  recommendations: [{
    type: {
      type: String, // 'schedule', 'focus', 'technique'
      enum: ['schedule', 'focus', 'technique']
    },
    title: String,
    description: String,
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    }
  }],
  techniques: [{
    name: String,
    description: String,
    effectiveness: Number, // 0-100
    category: String // 'pomodoro', 'spaced-repetition', 'active-recall', etc.
  }],
  graphData: [{
    day: String,
    real: Number,
    twin: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('DoppelgangerAnalysis', doppelgangerAnalysisSchema);

