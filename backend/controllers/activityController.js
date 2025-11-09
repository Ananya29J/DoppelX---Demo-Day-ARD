import Activity from '../models/Activity.js';

// Get all activities for a user
export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.userId })
      .sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new activity
export const createActivity = async (req, res) => {
  try {
    const { date, studyHours, score, breaks, sleepHours, tasksCompleted, notes } = req.body;

    const activity = new Activity({
      userId: req.userId,
      date: date || new Date(),
      studyHours,
      score,
      breaks: breaks || 0,
      sleepHours: sleepHours || 8,
      tasksCompleted: tasksCompleted || 0,
      notes
    });

    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an activity
export const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an activity
export const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get activity statistics
export const getActivityStats = async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.userId });
    
    const totalStudyHours = activities.reduce((sum, a) => sum + (a.studyHours || 0), 0);
    const averageScore = activities.length > 0
      ? activities.reduce((sum, a) => sum + (a.score || 0), 0) / activities.length
      : 0;
    const totalTasksCompleted = activities.reduce((sum, a) => sum + (a.tasksCompleted || 0), 0);
    const averageSleepHours = activities.length > 0
      ? activities.reduce((sum, a) => sum + (a.sleepHours || 8), 0) / activities.length
      : 8;

    res.json({
      totalActivities: activities.length,
      totalStudyHours,
      averageScore: Math.round(averageScore * 100) / 100,
      totalTasksCompleted,
      averageSleepHours: Math.round(averageSleepHours * 100) / 100
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

