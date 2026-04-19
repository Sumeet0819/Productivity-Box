import Todo from '../models/Todo.js';

// @desc    Get user todos
// @route   GET /api/todos
export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Set todo
// @route   POST /api/todos
export const setTodo = async (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({ message: 'Please add a text field' });
    }
    try {
        const todo = await Todo.create({
            text: req.body.text,
            user: req.user.id
        });
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
export const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await todo.deleteOne();
        res.json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
