import express from 'express';
import {
	getStudio,
	updateStudio,
} from '../controllers/studioController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getStudio);
router.patch('/', protect, updateStudio);

export default router;