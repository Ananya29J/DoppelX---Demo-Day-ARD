import express from 'express';
import {
  sendMessage,
  getChatHistory,
  clearChat
} from '../controllers/chatController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getChatHistory);
router.post('/message', sendMessage);
router.delete('/', clearChat);

export default router;

