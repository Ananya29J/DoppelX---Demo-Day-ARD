import express from 'express';
import {
  getSchedules,
  createSchedule,
  generateSchedule,
  getSchedule,
  updateSchedule,
  deleteSchedule
} from '../controllers/scheduleController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getSchedules);
router.post('/', createSchedule);
router.post('/generate', generateSchedule);
router.get('/:id', getSchedule);
router.put('/:id', updateSchedule);
router.delete('/:id', deleteSchedule);

export default router;

