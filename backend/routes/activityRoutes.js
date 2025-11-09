import express from 'express';
import {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  getActivityStats
} from '../controllers/activityController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getActivities);
router.get('/stats', getActivityStats);
router.post('/', createActivity);
router.put('/:id', updateActivity);
router.delete('/:id', deleteActivity);

export default router;

