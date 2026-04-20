import React, { useState, useEffect } from 'react';
import { goalService } from '../../services/api';
import { Target, Plus, CheckCircle2, Circle, Trash2, Calendar } from 'lucide-react';

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState('');
    const [type, setType] = useState('short'); // 'short' or 'long'
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadGoals();
    }, []);

    const loadGoals = async () => {
        try {
            const data = await goalService.getGoals();
            setGoals(data);
        } catch (error) {
            console.error('Failed to load goals:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddGoal = async (e) => {
        e.preventDefault();
        if (!newGoal.trim()) return;
        try {
            const added = await goalService.addGoal(newGoal, type);
            setGoals([...goals, added]);
            setNewGoal('');
        } catch (error) {
            console.error('Failed to add goal:', error);
        }
    };

    const toggleGoal = async (id, currentStatus) => {
        try {
            const updated = await goalService.updateGoal(id, { isCompleted: !currentStatus });
            setGoals(goals.map(g => g._id === id ? updated : g));
        } catch (error) {
            console.error('Failed to update goal:', error);
        }
    };

    const deleteGoal = async (id) => {
        try {
            await goalService.deleteGoal(id);
            setGoals(goals.filter(g => g._id !== id));
        } catch (error) {
            console.error('Failed to delete goal:', error);
        }
    };

    const filteredGoals = goals.filter(g => g.type === type);

    return (
        <div className="relative flex h-full flex-col rounded-[2rem] bg-[var(--surface-container-lowest)] p-6 shadow-[var(--shadow-focus)]">
             <div className="absolute inset-x-6 top-6 h-24 rounded-[2rem] bg-[var(--surface-container-low)] blur-2xl opacity-50 pointer-events-none" />
             
             <div className="relative z-10 flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="rounded-full bg-[var(--primary)]/10 p-2 text-[var(--primary)]">
                        <Target size={16} />
                    </div>
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[var(--on-surface-variant)]">
                        Strategic Goals
                    </span>
                </div>
                <div className="flex p-1 rounded-full bg-[var(--surface-container-low)]">
                    <button 
                        onClick={() => setType('short')}
                        className={`px-3 py-1 text-[0.6rem] font-bold uppercase tracking-wider rounded-full transition-all ${type === 'short' ? 'bg-[var(--primary)] text-white shadow-lg' : 'text-[var(--on-surface-variant)]'}`}
                    >
                        Short
                    </button>
                    <button 
                        onClick={() => setType('long')}
                        className={`px-3 py-1 text-[0.6rem] font-bold uppercase tracking-wider rounded-full transition-all ${type === 'long' ? 'bg-[var(--primary)] text-white shadow-lg' : 'text-[var(--on-surface-variant)]'}`}
                    >
                        Long
                    </button>
                </div>
             </div>

             <form onSubmit={handleAddGoal} className="relative z-10 mb-4 flex gap-2">
                <input 
                    type="text" 
                    placeholder={`Define a new ${type}-term goal...`}
                    className="flex-1 bg-[var(--surface-container-low)] rounded-xl px-4 py-2 text-xs outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                />
                <button type="submit" className="p-2 rounded-xl bg-[var(--primary)] text-white hover:scale-105 active:scale-95 transition">
                    <Plus size={16} />
                </button>
             </form>

             <div className="relative z-10 flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {filteredGoals.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-[var(--on-surface-variant)] opacity-40">
                         <Calendar size={32} strokeWidth={1} />
                         <span className="mt-2 text-[0.65rem] uppercase tracking-widest text-center">No goals defined yet</span>
                    </div>
                ) : (
                    filteredGoals.map((goal) => (
                        <div key={goal._id} className="group flex items-center justify-between p-3 rounded-2xl bg-[var(--surface-container-low)]/50 hover:bg-[var(--surface-container-low)] transition-all border border-transparent hover:border-[var(--primary)]/10">
                            <div className="flex items-center gap-3">
                                <button onClick={() => toggleGoal(goal._id, goal.isCompleted)}>
                                    {goal.isCompleted ? (
                                        <CheckCircle2 size={18} className="text-[var(--primary)]" />
                                    ) : (
                                        <Circle size={18} className="text-[var(--on-surface-variant)] opacity-40 hover:opacity-100" />
                                    )}
                                </button>
                                <span className={`text-xs font-medium transition-all ${goal.isCompleted ? 'text-[var(--on-surface-variant)] line-through' : 'text-[var(--on-surface)]'}`}>
                                    {goal.text}
                                </span>
                            </div>
                            <button 
                                onClick={() => deleteGoal(goal._id)}
                                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 transition-all p-1"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))
                )}
             </div>
        </div>
    );
};

export default Goals;
