import express from 'express';
import {
  createStudySession,
  updateStudySession,
  getStudySessions,
  getStudyStats
} from '../controllers/studySessionController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getStudySessions);
router.get('/stats', getStudyStats);
router.post('/', createStudySession);
router.put('/:id', updateStudySession);

export default router;

