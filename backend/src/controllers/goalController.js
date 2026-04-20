import Goal from '../models/Goal.js';

// @desc    Get goals
// @route   GET /api/goals
export const getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.user.id });
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Set goal
// @route   POST /api/goals
export const setGoal = async (req, res) => {
    try {
        if (!req.body.text || !req.body.type) {
            return res.status(400).json({ message: 'Please add a text field and type (short/long)' });
        }
        
        const goal = await Goal.create({
            text: req.body.text,
            type: req.body.type,
            user: req.user.id
        });

        res.status(201).json(goal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update goal
// @route   PUT /api/goals/:id
export const updateGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        // Make sure the logged in user matches the goal user
        if (goal.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedGoal = await Goal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedGoal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
export const deleteGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        // Make sure the logged in user matches the goal user
        if (goal.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await goal.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
