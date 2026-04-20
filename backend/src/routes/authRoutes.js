import express from 'express';
import { registerUser, loginUser, getMe, bootstrapUser, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/bootstrap', bootstrapUser);
router.put('/profile', protect, updateProfile);

export default router;
