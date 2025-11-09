import Schedule from '../models/Schedule.js';

// Get all schedules for a user
export const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find({ userId: req.userId })
      .sort({ createdAt: -1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new schedule
export const createSchedule = async (req, res) => {
  try {
    const { name, tasks, date } = req.body;

    const schedule = new Schedule({
      userId: req.userId,
      name: name || 'My Schedule',
      tasks: tasks || [],
      date: date || new Date()
    });

    await schedule.save();
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate schedule based on user input
export const generateSchedule = async (req, res) => {
  try {
    const { tasks, priorities } = req.body;

    if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
      return res.status(400).json({ message: 'Tasks array is required' });
    }

    // Simple schedule generation algorithm
    // You can enhance this with more sophisticated logic
    const generatedTasks = tasks.map((taskName, index) => {
      const priority = priorities?.[index] || 'medium';
      
      // Calculate time slots (assuming 8 AM start, 1 hour per task)
      const startHour = 8 + index;
      const startTime = `${startHour.toString().padStart(2, '0')}:00`;
      const endHour = startHour + 1;
      const endTime = `${endHour.toString().padStart(2, '0')}:00`;

      return {
        name: taskName,
        startTime,
        endTime,
        priority
      };
    });

    const schedule = new Schedule({
      userId: req.userId,
      name: 'Generated Schedule',
      tasks: generatedTasks,
      isGenerated: true,
      date: new Date()
    });

    await schedule.save();
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific schedule
export const getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a schedule
export const updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a schedule
export const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

