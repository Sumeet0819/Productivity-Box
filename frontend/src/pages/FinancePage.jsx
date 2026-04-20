import React, { useState, useEffect } from 'react';
import { financeService, authService } from '../services/api';
import SideBar from '../components/sidebar/SideBar';
import { Wallet, TrendingUp, TrendingDown, CreditCard, Plus, ArrowUpRight, ArrowDownLeft, ShieldCheck, Tag, Loader2, IndianRupee, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line } from 'recharts';

const FinancePage = () => {
    const [transactions, setTransactions] = useState([]);
    const [stats, setStats] = useState({ balance: 0, earned: 0, spent: 0 });
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [loading, setLoading] = useState(true);

    // Modal states
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);

    // Form states
    const [newCard, setNewCard] = useState({ provider: '', type: 'Visa', last4: '' });
    const [newUpi, setNewUpi] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [txData, statsData] = await Promise.all([
                financeService.getTransactions(),
                financeService.getStats()
            ]);
            setTransactions(txData);
            setStats(statsData);

            // Sync user data with latest from profile
            const freshUser = await authService.getMe();
            const currentUser = JSON.parse(localStorage.getItem('user'));
            const updatedUser = { ...currentUser, ...freshUser };
            
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCard = async (e) => {
        e.preventDefault();
        try {
            const updatedCards = [...(user.cards || []), newCard];
            const updatedUser = await authService.updateProfile({ cards: updatedCards });
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setIsCardModalOpen(false);
            setNewCard({ provider: '', type: 'Visa', last4: '' });
        } catch (error) {
            console.error('Failed to add card:', error);
        }
    };

    const handleAddUpi = async (e) => {
        e.preventDefault();
        try {
            const updatedUpiIds = [...(user.upiIds || []), newUpi];
            const updatedUser = await authService.updateProfile({ upiIds: updatedUpiIds });
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setIsUpiModalOpen(false);
            setNewUpi('');
        } catch (error) {
            console.error('Failed to add UPI:', error);
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        // Minimal visual feedback could be added here
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
    };

    // Prepare chart data (simple aggregation by date)
    const chartData = transactions.slice(0, 7).reverse().map(tx => ({
        name: new Date(tx.date).toLocaleDateString('en-US', { weekday: 'short' }),
        amount: tx.amount,
        type: tx.type
    }));

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[var(--surface)]">
                <Loader2 className="animate-spin text-[var(--primary)]" size={32} />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[var(--surface)] text-[var(--on-surface)] overflow-x-hidden">
            <div className="fixed inset-y-0 left-0 flex flex-col justify-center px-8 z-50 pointer-events-none">
                <div className="pointer-events-auto">
                    <SideBar />
                </div>
            </div>

            <div className="flex-1 flex flex-col pl-[120px] pr-6 py-8">
                <div className="w-full max-w-7xl mx-auto space-y-8">
                    <header className="flex items-end justify-between">
                        <div>
                            <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">Capital & Transactions</p>
                            <h1 className="text-4xl font-bold tracking-tight mt-2 text-[var(--on-surface)]">Finance Hub</h1>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Summary Section */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* Cards Row */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-8 rounded-[2rem] bg-[var(--primary)] text-white shadow-2xl shadow-[var(--primary)]/20 overflow-hidden relative group">
                                    <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700">
                                        <Wallet size={120} />
                                    </div>
                                    <p className="text-[0.65rem] uppercase tracking-[0.3em] font-bold opacity-70">Net Balance</p>
                                    <h3 className="text-4xl font-bold mt-2 tabular-nums">{formatCurrency(stats.balance)}</h3>
                                    <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-white/80">
                                        <ShieldCheck size={14} /> Account Secure
                                    </div>
                                </div>

                                <div className="p-8 rounded-[2rem] bg-[var(--surface-container-lowest)] shadow-[var(--shadow-focus)] border border-[var(--surface-container-low)]">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 rounded-2xl bg-green-500/10 text-green-500">
                                            <TrendingUp size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[0.55rem] uppercase tracking-[0.3em] text-[var(--on-surface-variant)] font-bold">Total Inflow</p>
                                            <p className="text-xl font-bold text-[var(--on-surface)] mt-1">{formatCurrency(stats.earned)}</p>
                                        </div>
                                    </div>
                                    <div className="mt-8 h-1 w-full bg-[var(--surface-container-low)] rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500" style={{ width: '100%' }} />
                                    </div>
                                </div>

                                <div className="p-8 rounded-[2rem] bg-[var(--surface-container-lowest)] shadow-[var(--shadow-focus)] border border-[var(--surface-container-low)]">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 rounded-2xl bg-red-500/10 text-red-500">
                                            <TrendingDown size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[0.55rem] uppercase tracking-[0.3em] text-[var(--on-surface-variant)] font-bold">Total Outflow</p>
                                            <p className="text-xl font-bold text-[var(--on-surface)] mt-1">{formatCurrency(stats.spent)}</p>
                                        </div>
                                    </div>
                                    <div className="mt-8 h-1 w-full bg-[var(--surface-container-low)] rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500" style={{ width: `${(stats.spent / (stats.earned || 1)) * 100}%` }} />
                                    </div>
                                </div>
                            </div>

                            {/* Main Chart */}
                            <div className="p-8 rounded-[2.5rem] bg-[var(--surface-container-lowest)] shadow-[var(--shadow-focus)] min-h-[400px]">
                                <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
                                    Activity Stream
                                    <span className="text-xs font-normal text-[var(--on-surface-variant)] uppercase tracking-[0.2em] ml-2">Last 7 Entries</span>
                                </h3>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--surface-container-low)" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--on-surface-variant)' }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--on-surface-variant)' }} />
                                            <Tooltip cursor={{ fill: 'var(--surface-container-low)' }} contentStyle={{ borderRadius: '1rem', border: 'none', backgroundColor: 'var(--surface-container-low)', color: 'var(--on-surface)' }} />
                                            <Bar dataKey="amount" radius={[8, 8, 8, 8]}>
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.type === 'income' ? 'var(--primary)' : '#ef4444'} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar info */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* Wallet Cards Section */}
                            <div className="p-8 rounded-[2.5rem] bg-[var(--surface-container-lowest)] shadow-[var(--shadow-focus)] space-y-6">
                                <h3 className="text-lg font-bold flex items-center justify-between">
                                    Wallet Cards
                                    <button
                                        onClick={() => setIsCardModalOpen(true)}
                                        className="p-2 bg-[var(--surface-container-low)] rounded-full hover:bg-[var(--surface-container-high)] text-[var(--primary)] transition shadow-sm"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </h3>
                                {user.cards && user.cards.length > 0 ? (
                                    <div className="flex flex-col gap-4">
                                        {user.cards.map((card, idx) => (
                                            <div key={idx} className="p-6 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                                                <div className="relative z-10">
                                                    <div className="flex justify-between items-start mb-8">
                                                        <CreditCard size={24} />
                                                        <span className="text-[0.6rem] font-bold uppercase tracking-widest opacity-60">{card.provider}</span>
                                                    </div>
                                                    <p className="text-sm tracking-[0.2em] font-mono">•••• •••• •••• {card.last4}</p>
                                                    <p className="mt-2 text-[0.6rem] font-bold uppercase opacity-60">ACTIVE STATUS</p>
                                                </div>
                                                <div className="absolute top-0 right-0 p-2 opacity-5">
                                                    <CreditCard size={100} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-10 rounded-3xl border-2 border-dashed border-[var(--surface-container-low)] flex flex-col items-center justify-center text-center opacity-40">
                                        <CreditCard size={32} strokeWidth={1} />
                                        <p className="text-[0.6rem] uppercase tracking-widest mt-2 font-bold">No active cards</p>
                                    </div>
                                )}

                                {/* UPI Section */}
                                <div className="pt-6 border-t border-[var(--surface-container-low)]">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-[0.65rem] uppercase tracking-[0.3em] font-bold text-[var(--on-surface-variant)]">Digital IDs</h4>
                                        <button
                                            onClick={() => setIsUpiModalOpen(true)}
                                            className="p-1.5 bg-[var(--surface-container-low)] rounded-full hover:bg-[var(--surface-container-high)] text-[var(--primary)] transition"
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {user.upiIds && user.upiIds.length > 0 ? (
                                            user.upiIds.map((id, idx) => (
                                                <div key={idx} className="flex items-center justify-between bg-[var(--surface-container-low)] px-4 py-3 rounded-2xl group hover:bg-[var(--surface-container-high)] transition cursor-pointer"
                                                    onClick={() => handleCopy(id)}
                                                >
                                                    <span className="text-xs font-semibold">{id}</span>
                                                    <span className="text-[0.5rem] bg-[var(--primary)] text-white px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Click to Copy</span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-[0.6rem] text-[var(--on-surface-variant)] italic">No UPI IDs attached.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transaction History Table */}
                    <div className="p-8 rounded-[2.5rem] bg-[var(--surface-container-lowest)] shadow-[var(--shadow-focus)]">
                        <h3 className="text-lg font-bold mb-8">Detailed Narrative</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="text-[0.65rem] uppercase tracking-[0.3em] text-[var(--on-surface-variant)] border-b border-[var(--surface-container-low)]">
                                    <tr>
                                        <th className="pb-4 font-bold">Movement</th>
                                        <th className="pb-4 font-bold text-center">Category</th>
                                        <th className="pb-4 font-bold text-center">Date</th>
                                        <th className="pb-4 font-bold text-right">Value</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--surface-container-low)]">
                                    {transactions.map((tx) => (
                                        <tr key={tx._id} className="group hover:bg-[var(--surface-container-low)]/30 transition">
                                            <td className="py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-2 rounded-xl ${tx.type === 'income' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                        {tx.type === 'income' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold">{tx.description}</p>
                                                        <p className="text-[0.6rem] uppercase tracking-wider text-[var(--on-surface-variant)]">{tx.type}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-5 text-center px-4">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--surface-container-low)] rounded-full text-[0.65rem] font-bold uppercase tracking-wider">
                                                    <Tag size={10} /> {tx.category}
                                                </span>
                                            </td>
                                            <td className="py-5 text-center text-xs text-[var(--on-surface-variant)]">
                                                {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}
                                            </td>
                                            <td className={`py-5 text-right font-bold tabular-nums ${tx.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                                                {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Card Modal */}
            {isCardModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="w-full max-w-sm rounded-[2.5rem] bg-[var(--surface-container-lowest)] p-8 shadow-2xl border border-[var(--surface-container-low)]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Add Wallet Card</h3>
                            <button onClick={() => setIsCardModalOpen(false)} className="p-2 rounded-full hover:bg-[var(--surface-container-low)] transition">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAddCard} className="space-y-4">
                            <div>
                                <label className="block text-[0.6rem] uppercase tracking-widest font-bold text-[var(--on-surface-variant)] mb-1.5 px-1">Bank / Provider</label>
                                <input
                                    required
                                    className="w-full bg-[var(--surface-container-low)] rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                                    placeholder="e.g. HDFC Bank"
                                    value={newCard.provider}
                                    onChange={(e) => setNewCard({ ...newCard, provider: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[0.6rem] uppercase tracking-widest font-bold text-[var(--on-surface-variant)] mb-1.5 px-1">Type</label>
                                    <select
                                        className="w-full bg-[var(--surface-container-low)] rounded-2xl px-5 py-3 text-sm outline-none appearance-none"
                                        value={newCard.type}
                                        onChange={(e) => setNewCard({ ...newCard, type: e.target.value })}
                                    >
                                        <option value="Visa">Visa</option>
                                        <option value="Mastercard">Mastercard</option>
                                        <option value="Amex">Amex</option>
                                        <option value="Rupay">Rupay</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[0.6rem] uppercase tracking-widest font-bold text-[var(--on-surface-variant)] mb-1.5 px-1">Last 4 Digits</label>
                                    <input
                                        required
                                        maxLength={4}
                                        className="w-full bg-[var(--surface-container-low)] rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                                        placeholder="4242"
                                        value={newCard.last4}
                                        onChange={(e) => setNewCard({ ...newCard, last4: e.target.value })}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="w-full py-4 mt-4 btn-primary rounded-full text-white font-bold shadow-lg shadow-[var(--primary)]/20 transform hover:scale-[1.02] active:scale-[0.98] transition">
                                Securely Add Card
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Add UPI Modal */}
            {isUpiModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="w-full max-w-sm rounded-[2.5rem] bg-[var(--surface-container-lowest)] p-8 shadow-2xl border border-[var(--surface-container-low)]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Add UPI ID</h3>
                            <button onClick={() => setIsUpiModalOpen(false)} className="p-2 rounded-full hover:bg-[var(--surface-container-low)] transition">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAddUpi} className="space-y-4">
                            <div>
                                <label className="block text-[0.6rem] uppercase tracking-widest font-bold text-[var(--on-surface-variant)] mb-1.5 px-1">UPI Address (VPA)</label>
                                <input
                                    required
                                    className="w-full bg-[var(--surface-container-low)] rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                                    placeholder="username@okaxis"
                                    value={newUpi}
                                    onChange={(e) => setNewUpi(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="w-full py-4 mt-4 btn-primary rounded-full text-white font-bold shadow-lg shadow-[var(--primary)]/20 transform hover:scale-[1.02] transition">
                                Link Digital ID
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FinancePage;
