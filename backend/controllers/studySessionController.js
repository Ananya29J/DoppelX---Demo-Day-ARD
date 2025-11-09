import StudySession from '../models/StudySession.js';

// Create a new study session
export const createStudySession = async (req, res) => {
  try {
    const { type, duration } = req.body;

    const session = new StudySession({
      userId: req.userId,
      type: type || 'pomodoro',
      duration: duration || (type === 'pomodoro' ? 25 * 60 : 0)
    });

    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update study session (when completed)
export const updateStudySession = async (req, res) => {
  try {
    const { duration, completed } = req.body;

    const session = await StudySession.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      {
        duration,
        endTime: completed ? new Date() : undefined,
        completed: completed || false
      },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ message: 'Study session not found' });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all study sessions for a user
export const getStudySessions = async (req, res) => {
  try {
    const sessions = await StudySession.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get study session statistics
export const getStudyStats = async (req, res) => {
  try {
    const sessions = await StudySession.find({ userId: req.userId });
    
    const totalSessions = sessions.length;
    const totalTime = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
    const completedSessions = sessions.filter(s => s.completed).length;
    const pomodoroSessions = sessions.filter(s => s.type === 'pomodoro').length;
    const infinitySessions = sessions.filter(s => s.type === 'infinity').length;

    res.json({
      totalSessions,
      totalTime, // in seconds
      completedSessions,
      pomodoroSessions,
      infinitySessions,
      averageSessionTime: totalSessions > 0 ? totalTime / totalSessions : 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

