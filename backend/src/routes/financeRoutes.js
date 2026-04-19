import express from 'express';
import { getTransactions, addTransaction, getFinanceStats, resetTransactions } from '../controllers/financeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getTransactions).post(protect, addTransaction);
router.route('/stats').get(protect, getFinanceStats);
router.route('/reset').delete(protect, resetTransactions);

export default router;
