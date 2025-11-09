import express from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTimeSpent
} from '../controllers/taskController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/time', updateTimeSpent);

export default router;

