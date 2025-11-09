import DoppelgangerAnalysis from '../models/DoppelgangerAnalysis.js';
import Activity from '../models/Activity.js';
import Task from '../models/Task.js';
import StudySession from '../models/StudySession.js';

// Analyze and create doppelganger analysis
export const createAnalysis = async (req, res) => {
  try {
    const { studyHours, breaks, sleepHours, pastPerformance } = req.body;

    // Get user's historical data if not provided
    let avgStudyHours = studyHours;
    let avgBreaks = breaks;
    let avgSleep = sleepHours;
    let avgPerformance = pastPerformance;

    if (!studyHours || !pastPerformance) {
      const activities = await Activity.find({ userId: req.userId })
        .sort({ date: -1 })
        .limit(30); // Last 30 days

      if (activities.length > 0) {
        avgStudyHours = activities.reduce((sum, a) => sum + (a.studyHours || 0), 0) / activities.length;
        avgBreaks = activities.reduce((sum, a) => sum + (a.breaks || 0), 0) / activities.length;
        avgSleep = activities.reduce((sum, a) => sum + (a.sleepHours || 8), 0) / activities.length;
        avgPerformance = activities.reduce((sum, a) => sum + (a.score || 0), 0) / activities.length;
      }
    }

    // Simulate outcomes
    const simulatedOutcomes = [
      {
        scenario: `Study ${avgStudyHours + 1} hours instead of ${avgStudyHours}`,
        predictedScore: Math.min(100, avgPerformance + 5),
        improvement: 5
      },
      {
        scenario: `Study ${avgStudyHours + 2} hours instead of ${avgStudyHours}`,
        predictedScore: Math.min(100, avgPerformance + 15),
        improvement: 15
      },
      {
        scenario: `Take ${avgBreaks + 1} breaks instead of ${avgBreaks}`,
        predictedScore: Math.min(100, avgPerformance + 3),
        improvement: 3
      },
      {
        scenario: `Sleep ${avgSleep + 1} hours instead of ${avgSleep}`,
        predictedScore: Math.min(100, avgPerformance + 8),
        improvement: 8
      }
    ];

    // Generate recommendations
    const recommendations = [];
    
    if (avgStudyHours < 3) {
      recommendations.push({
        type: 'schedule',
        title: 'Increase Study Hours',
        description: `You're currently studying ${avgStudyHours.toFixed(1)} hours per day. Increasing to 4-5 hours could boost your scores by 10-15%.`,
        priority: 'high'
      });
    }

    if (avgSleep < 7) {
      recommendations.push({
        type: 'schedule',
        title: 'Improve Sleep Schedule',
        description: `Getting at least 7-8 hours of sleep can improve focus and retention by up to 20%.`,
        priority: 'high'
      });
    }

    if (avgBreaks < 2) {
      recommendations.push({
        type: 'focus',
        title: 'Take Regular Breaks',
        description: 'Taking breaks every 25-30 minutes can improve productivity and prevent burnout.',
        priority: 'medium'
      });
    }

    recommendations.push({
      type: 'technique',
      title: 'Try Pomodoro Technique',
      description: 'Study for 25 minutes, then take a 5-minute break. This technique improves focus and retention.',
      priority: 'medium'
    });

    // Generate study techniques
    const techniques = [
      {
        name: 'Pomodoro Technique',
        description: '25 minutes focused study, 5 minutes break',
        effectiveness: 85,
        category: 'time-management'
      },
      {
        name: 'Spaced Repetition',
        description: 'Review material at increasing intervals',
        effectiveness: 90,
        category: 'memory'
      },
      {
        name: 'Active Recall',
        description: 'Test yourself instead of re-reading',
        effectiveness: 88,
        category: 'comprehension'
      },
      {
        name: 'Feynman Technique',
        description: 'Teach concepts in simple terms',
        effectiveness: 82,
        category: 'understanding'
      },
      {
        name: 'Mind Mapping',
        description: 'Visual representation of information',
        effectiveness: 75,
        category: 'organization'
      }
    ];

    // Generate graph data (last 7 days)
    const graphData = [];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    for (let i = 0; i < 7; i++) {
      const realHours = avgStudyHours + (Math.random() * 2 - 1); // Add some variation
      const twinHours = realHours + 1 + Math.random(); // Twin studies more
      graphData.push({
        day: days[i],
        real: Math.round(realHours * 10) / 10,
        twin: Math.round(twinHours * 10) / 10
      });
    }

    const analysis = new DoppelgangerAnalysis({
      userId: req.userId,
      studyHours: avgStudyHours,
      breaks: avgBreaks,
      sleepHours: avgSleep,
      pastPerformance: avgPerformance,
      simulatedOutcomes,
      recommendations,
      techniques,
      graphData
    });

    await analysis.save();
    res.status(201).json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all analyses for a user
export const getAnalyses = async (req, res) => {
  try {
    const analyses = await DoppelgangerAnalysis.find({ userId: req.userId })
      .sort({ createdAt: -1 });
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get latest analysis
export const getLatestAnalysis = async (req, res) => {
  try {
    const analysis = await DoppelgangerAnalysis.findOne({ userId: req.userId })
      .sort({ createdAt: -1 });

    if (!analysis) {
      return res.status(404).json({ message: 'No analysis found' });
    }

    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Simulate different scenarios
export const simulateScenario = async (req, res) => {
  try {
    const { studyHours, breaks, sleepHours } = req.body;

    // Get user's baseline
    const latestAnalysis = await DoppelgangerAnalysis.findOne({ userId: req.userId })
      .sort({ createdAt: -1 });

    const baselinePerformance = latestAnalysis?.pastPerformance || 70;
    const baselineStudyHours = latestAnalysis?.studyHours || 3;

    // Calculate predicted improvement
    const studyHoursDiff = (studyHours || baselineStudyHours) - baselineStudyHours;
    const improvement = Math.min(20, Math.max(0, studyHoursDiff * 5)); // 5% per hour, max 20%
    
    const predictedScore = Math.min(100, baselinePerformance + improvement);

    res.json({
      baselinePerformance,
      predictedScore,
      improvement: Math.round(improvement * 100) / 100,
      studyHours: studyHours || baselineStudyHours,
      breaks: breaks || 2,
      sleepHours: sleepHours || 8
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

