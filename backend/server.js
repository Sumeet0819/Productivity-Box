import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';

import authRoutes from './src/routes/authRoutes.js';
import todoRoutes from './src/routes/todoRoutes.js';
import financeRoutes from './src/routes/financeRoutes.js';
import goalRoutes from './src/routes/goalRoutes.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: ['https://productivity-box.vercel.app', 'http://localhost:5173'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/goals', goalRoutes);

app.get('/', (req, res) => {
    res.send('Daily Utility Backend API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
