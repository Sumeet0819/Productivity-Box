import express from 'express';
import { getTodos, setTodo, updateTodo, deleteTodo, getTodoStats } from '../controllers/todoController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getTodos).post(protect, setTodo);
router.get('/stats', protect, getTodoStats);
router.route('/:id').put(protect, updateTodo).delete(protect, deleteTodo);

export default router;
