import Transaction from '../models/Transaction.js';

// @desc    Get user transactions
// @route   GET /api/finance
export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add transaction
// @route   POST /api/finance
export const addTransaction = async (req, res) => {
    const { amount, type } = req.body;
    if (!amount || !type) {
        return res.status(400).json({ message: 'Please add amount and type' });
    }

    try {
        const transaction = await Transaction.create({
            amount,
            type,
            user: req.user.id
        });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get aggregated stats (balance, total income, total expense)
// @route   GET /api/finance/stats
export const getFinanceStats = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id });
        let earned = 0;
        let spent = 0;

        transactions.forEach(tx => {
            if (tx.type === 'income') earned += tx.amount;
            else if (tx.type === 'expense') spent += tx.amount;
        });

        res.json({
            earned,
            spent,
            balance: earned - spent
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Clear / reset transactions
// @route   DELETE /api/finance/reset
export const resetTransactions = async (req, res) => {
    try {
        await Transaction.deleteMany({ user: req.user.id });
        res.json({ message: 'All transactions cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
