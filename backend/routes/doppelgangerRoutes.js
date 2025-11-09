import express from 'express';
import {
  createAnalysis,
  getAnalyses,
  getLatestAnalysis,
  simulateScenario
} from '../controllers/doppelgangerController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getAnalyses);
router.get('/latest', getLatestAnalysis);
router.post('/', createAnalysis);
router.post('/simulate', simulateScenario);

export default router;

