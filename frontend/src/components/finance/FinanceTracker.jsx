import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown, Plus, Minus, X, Calculator, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { financeService } from '../../services/api';

const FinanceTracker = () => {
    const [balance, setBalance] = useState(0);
    const [spent, setSpent] = useState(0);
    const [earned, setEarned] = useState(0);

    const [isAmountsVisible, setIsAmountsVisible] = useState(true);

    // Modal state
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupType, setPopupType] = useState('income'); // 'income' or 'expense'
    const [amountInput, setAmountInput] = useState('');

    const loadStats = async () => {
        try {
            const stats = await financeService.getStats();
            setBalance(stats.balance);
            setEarned(stats.earned);
            setSpent(stats.spent);
        } catch (error) {
            console.error('Failed to load stats', error);
        }
    };

    useEffect(() => {
        loadStats();
    }, []);

    const formatCurrency = (val) => {
        if (!isAmountsVisible) return '₹ ••••••';
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
    };

    const handleClear = async () => {
        try {
            await financeService.clearTransactions();
            await loadStats();
        } catch (error) {
            console.error('Failed to clear', error);
        }
    };

    const handleQuickIncome = async () => {
        try {
            await financeService.addTransaction(150, 'income');
            await loadStats();
        } catch (error) {
            console.error(error);
        }
    };

    const handleQuickExpense = async () => {
        try {
            await financeService.addTransaction(80, 'expense');
            await loadStats();
        } catch (error) {
            console.error(error);
        }
    };

    const openPopup = (type = 'income') => {
        setPopupType(type);
        setAmountInput('');
        setIsPopupOpen(true);
    };

    const handleTransactionSubmit = async (e) => {
        e.preventDefault();
        const amount = parseFloat(amountInput);
        if (isNaN(amount) || amount <= 0) return;

        try {
            await financeService.addTransaction(amount, popupType);
            await loadStats();
            setIsPopupOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="w-full min-h-[220px] flex flex-col justify-between rounded-[2rem] bg-[var(--surface-container-lowest)] p-4 shadow-[var(--shadow-focus)] relative overflow-hidden">
                {/* Header Area */}
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <p className="text-[0.55rem] uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">Finance</p>
                        <h2 className="mt-1 text-sm font-semibold tracking-tight text-[var(--on-surface)] flex items-center gap-2">
                            Wallet Balance
                        </h2>
                        <div className="mt-1.5 flex items-center gap-2.5 text-[0.85rem] text-[var(--on-surface-variant)]">
                            <div className="flex items-center gap-1.5">
                                <Wallet size={14} className="text-[var(--primary)]" />
                                <span>Active</span>
                            </div>
                            <div className="h-3 w-px bg-[var(--surface-container-high)]"></div>
                            <button
                                onClick={() => setIsAmountsVisible(!isAmountsVisible)}
                                className="hover:text-[var(--on-surface)] transition-colors"
                                title={isAmountsVisible ? "Hide amounts" : "Show amounts"}
                            >
                                {isAmountsVisible ? <EyeOff size={14} strokeWidth={2.5} /> : <Eye size={14} strokeWidth={2.5} />}
                            </button>
                            <button
                                onClick={handleClear}
                                className="hover:text-red-500 transition-colors"
                                title="Reset all amounts"
                            >
                                <RotateCcw size={14} strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 z-10">
                        <button
                            onClick={handleQuickExpense}
                            className="rounded-full bg-[var(--surface-container-low)] p-2.5 text-[var(--on-surface)] transition-colors hover:bg-red-50 hover:text-red-500"
                            title="Quick Expense (-₹80)"
                        >
                            <Minus size={14} strokeWidth={3} />
                        </button>
                        <button
                            onClick={handleQuickIncome}
                            className="rounded-full bg-[var(--primary)] p-2.5 text-white shadow-[0_4px_12px_rgba(0,33,15,0.2)] transition-all hover:scale-105 active:scale-95"
                            title="Quick Income (+₹150)"
                        >
                            <Plus size={14} strokeWidth={3} />
                        </button>
                        <button
                            onClick={() => openPopup('income')}
                            className="rounded-full bg-[var(--surface-container-highest)] p-2.5 text-[var(--on-surface)] transition-all hover:scale-105 active:scale-95 ml-1"
                            title="Custom Transaction"
                        >
                            <Calculator size={14} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>

                {/* Total Balance & Progress */}
                <div className="mt-4 flex flex-1 flex-col items-center justify-center text-center">
                    <p className={`text-[2.25rem] font-semibold tracking-tight text-[var(--on-surface)] transition-all duration-300 ${!isAmountsVisible ? 'tracking-widest opacity-80' : 'tabular-nums'}`}>
                        {formatCurrency(balance)}
                    </p>
                    <div className="mt-4 flex w-4/5 items-center justify-between gap-2 opacity-80 hover:opacity-100 transition-opacity">
                        <div className="flex h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--surface-container-low)]">
                            <div
                                className="h-full bg-red-400 transition-all duration-500 ease-out"
                                style={{ width: `${(spent / (earned + spent || 1)) * 100}%` }}
                                title={`Spent: ${formatCurrency(spent)}`}
                            />
                        </div>
                        <div className="flex h-1.5 flex-[1.5] overflow-hidden rounded-full bg-[var(--surface-container-low)]">
                            <div
                                className="h-full bg-[var(--primary)] transition-all duration-500 ease-out"
                                style={{ width: `${(earned / (earned + spent || 1)) * 100}%` }}
                                title={`Earned: ${formatCurrency(earned)}`}
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Stats Grid */}
                <div className="mt-4 grid grid-cols-2 gap-2 rounded-[2rem] bg-[var(--surface-container-low)] p-2.5 text-center text-[var(--on-surface-variant)]">
                    <div className="border-r border-[var(--surface-container-lowest)] px-2 space-y-1">
                        <TrendingDown size={14} className="mx-auto text-red-400" />
                        <p className="mt-1 text-[0.55rem] uppercase tracking-[0.35em]">Spent</p>
                        <p className="text-[0.75rem] font-semibold text-[var(--on-surface)]">{formatCurrency(spent)}</p>
                    </div>
                    <div className="px-2 space-y-1">
                        <TrendingUp size={14} className="mx-auto text-[var(--primary)]" />
                        <p className="mt-1 text-[0.55rem] uppercase tracking-[0.35em]">Earned</p>
                        <p className="text-[0.75rem] font-semibold text-[var(--on-surface)]">{formatCurrency(earned)}</p>
                    </div>
                </div>
            </div>

            {/* Transaction Pop-up Modal */}
            {isPopupOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="w-full max-w-sm rounded-[2.5rem] bg-[var(--surface-container-lowest)] p-6 shadow-2xl animate-in zoom-in-95 duration-200 border border-[var(--surface-container-low)] text-[var(--on-surface)]">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                Custom Transaction
                            </h3>
                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className="p-2 text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)] hover:text-[var(--on-surface)] rounded-full transition-colors"
                            >
                                <X size={20} strokeWidth={2.5} />
                            </button>
                        </div>

                        <div className="flex gap-2 mb-6 bg-[var(--surface-container-low)] p-1 rounded-[1.25rem]">
                            <button
                                onClick={() => setPopupType('income')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[1rem] text-sm font-semibold transition-all ${popupType === 'income' ? 'bg-[var(--primary)] text-white shadow-sm' : 'text-[var(--on-surface-variant)] hover:text-[var(--on-surface)]'}`}
                            >
                                <TrendingUp size={16} /> Income
                            </button>
                            <button
                                onClick={() => setPopupType('expense')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[1rem] text-sm font-semibold transition-all ${popupType === 'expense' ? 'bg-red-500 text-white shadow-sm' : 'text-[var(--on-surface-variant)] hover:text-[var(--on-surface)]'}`}
                            >
                                <TrendingDown size={16} /> Expense
                            </button>
                        </div>

                        <form onSubmit={handleTransactionSubmit} className="space-y-6">
                            <div>
                                <label className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--on-surface-variant)] mb-2 px-2">
                                    Enter Amount
                                </label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 font-semibold text-[var(--on-surface-variant)] text-lg">₹</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        autoFocus
                                        value={amountInput}
                                        onChange={(e) => setAmountInput(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full rounded-[1.5rem] bg-[var(--surface-container-low)] border-[1.5px] border-transparent px-10 py-4 text-xl font-semibold text-[var(--on-surface)] transition-all placeholder:text-[var(--on-surface-variant)]/40 focus:border-[var(--primary)] focus:bg-[var(--surface-container-lowest)] focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/10"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`w-full rounded-[1.5rem] py-4 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] ${popupType === 'income' ? 'bg-[var(--primary)] shadow-[var(--primary)]/20 hover:bg-[var(--primary)]/90' : 'bg-red-500 shadow-red-500/20 hover:bg-red-600'
                                    }`}
                            >
                                Confirm {popupType === 'income' ? 'Income' : 'Expense'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default FinanceTracker;