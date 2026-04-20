import React, { useState, useEffect } from 'react';
import { goalService } from '../services/api';
import SideBar from '../components/sidebar/SideBar';
import { Plus, Target, Trash2, CheckCircle2, Circle } from 'lucide-react';

const COLORS = [
    '#fef3c7', // Yellow
    '#dcfce7', // Green
    '#fee2e2', // Red
    '#e0f2fe', // Blue
    '#f3e8ff', // Purple
    '#ffedd5', // Orange
];

const GoalsPage = () => {
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState('');
    const [type, setType] = useState('short');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadGoals();
    }, []);

    const loadGoals = async () => {
        try {
            const data = await goalService.getGoals();
            setGoals(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddGoal = async (e) => {
        e.preventDefault();
        if (!newGoal.trim()) return;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        try {
            const added = await goalService.addGoal(newGoal, type, color);
            setGoals([...goals, added]);
            setNewGoal('');
        } catch (error) {
            console.error(error);
        }
    };

    const toggleGoal = async (id, currentStatus) => {
        try {
            const updated = await goalService.updateGoal(id, { isCompleted: !currentStatus });
            setGoals(goals.map(g => g._id === id ? updated : g));
        } catch (error) {
            console.error(error);
        }
    };

    const deleteGoal = async (id) => {
        try {
            await goalService.deleteGoal(id);
            setGoals(goals.filter(g => g._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const filteredGoals = goals.filter(g => g.type === type);

    return (
        <div className="flex min-h-screen bg-[var(--surface)] text-[var(--on-surface)]">
            <div className="fixed inset-y-0 left-0 flex flex-col justify-center px-8 z-50 pointer-events-none">
                <div className="pointer-events-auto">
                    <SideBar />
                </div>
            </div>

            <div className="flex-1 flex flex-col pl-[120px] pr-6 py-8">
                <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col">
                    <header className="flex items-end justify-between mb-10">
                        <div>
                            <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">Vision & Intent</p>
                            <h1 className="text-4xl font-bold tracking-tight mt-2 text-[var(--on-surface)]">Strategic Goals</h1>
                        </div>
                        <div className="flex p-1 rounded-full bg-[var(--surface-container-low)]">
                            <button 
                                onClick={() => setType('short')}
                                className={`px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-all ${type === 'short' ? 'bg-[var(--primary)] text-white shadow-lg' : 'text-[var(--on-surface-variant)] hover:text-[var(--on-surface)]'}`}
                            >
                                Short Term
                            </button>
                            <button 
                                onClick={() => setType('long')}
                                className={`px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-all ${type === 'long' ? 'bg-[var(--primary)] text-white shadow-lg' : 'text-[var(--on-surface-variant)] hover:text-[var(--on-surface)]'}`}
                            >
                                Long Term
                            </button>
                        </div>
                    </header>

                    <form onSubmit={handleAddGoal} className="mb-12 flex gap-4 max-w-xl mx-auto w-full">
                        <input 
                            type="text" 
                            placeholder={`Define a new ${type}-term milestone...`}
                            className="flex-1 bg-[var(--surface-container-lowest)] border border-[var(--surface-container-low)] rounded-2xl px-6 py-4 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all shadow-sm"
                            value={newGoal}
                            onChange={(e) => setNewGoal(e.target.value)}
                        />
                        <button type="submit" className="px-6 rounded-2xl bg-[var(--primary)] text-white hover:scale-105 active:scale-95 transition shadow-lg flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
                            <Plus size={18} /> Add
                        </button>
                    </form>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredGoals.map((goal) => (
                            <div 
                                key={goal._id}
                                style={{ backgroundColor: goal.color }}
                                className={`relative aspect-square p-8 rounded-[2rem] shadow-xl transform transition-all hover:scale-[1.02] hover:-rotate-1 flex flex-col justify-between group overflow-hidden ${goal.isCompleted ? 'opacity-60 saturate-50' : ''}`}
                            >
                                {/* Folded corner effect */}
                                <div className="absolute top-0 right-0 w-12 h-12 bg-black/5 rounded-bl-[2rem]" />
                                
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Target size={14} className="text-black/30" />
                                        <span className="text-[0.6rem] uppercase tracking-[0.2em] font-bold text-black/40">Goal</span>
                                    </div>
                                    <p className={`text-lg font-bold leading-tight text-black/80 ${goal.isCompleted ? 'line-through' : ''}`}>
                                        {goal.text}
                                    </p>
                                </div>

                                <div className="relative z-10 flex items-center justify-between mt-6">
                                    <button 
                                        onClick={() => toggleGoal(goal._id, goal.isCompleted)}
                                        className="p-2 rounded-full hover:bg-black/5 transition-colors"
                                    >
                                        {goal.isCompleted ? (
                                            <CheckCircle2 size={24} className="text-green-600" />
                                        ) : (
                                            <Circle size={24} className="text-black/20 hover:text-black/40" />
                                        )}
                                    </button>
                                    <button 
                                        onClick={() => deleteGoal(goal._id)}
                                        className="opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-black/5 text-black/40 hover:text-red-500 transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoalsPage;
