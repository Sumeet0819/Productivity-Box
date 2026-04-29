import React from 'react';
import { Trash2, CheckCircle2, Circle, Calendar, Sparkles } from 'lucide-react';

const GridView = ({ tasks, onToggleComplete, onDelete }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pr-2 pb-10 custom-scrollbar">
            {tasks.map(task => (
                <div 
                    key={task._id}
                    className={`relative group flex flex-col p-6 rounded-[2rem] border transition-all duration-500 overflow-hidden ${
                        task.completed 
                        ? 'bg-[var(--surface-container-lowest)]/40 border-transparent opacity-60 scale-[0.98]' 
                        : 'bg-gradient-to-br from-[var(--surface-container-lowest)] to-[var(--surface-container-lowest)] hover:to-[var(--primary)]/5 border-[var(--surface-container-low)] shadow-[0_8px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(0,106,60,0.1)] hover:-translate-y-1 hover:border-[var(--primary)]/30'
                    }`}
                >
                    {/* Decorative Background blob */}
                    {!task.completed && (
                        <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-[var(--primary)]/5 blur-2xl group-hover:bg-[var(--primary)]/10 transition-all duration-500" />
                    )}

                    <div className="relative z-10 flex justify-between items-start mb-6">
                        <div className={`px-3.5 py-1.5 rounded-full text-[0.65rem] font-bold uppercase tracking-[0.2em] flex items-center gap-1.5 ${
                            task.completed ? 'bg-slate-500/10 text-slate-500' :
                            task.status === 'done' ? 'bg-emerald-500/10 text-emerald-500' :
                            task.status === 'in-progress' ? 'bg-amber-500/10 text-amber-500' :
                            'bg-[var(--primary)]/10 text-[var(--primary)]'
                        }`}>
                            {task.completed && <Sparkles size={10} />}
                            {task.completed ? 'Completed' : (task.status || 'Task')}
                        </div>
                        <button 
                            onClick={() => onDelete(task._id)}
                            className="p-2 rounded-full bg-[var(--surface-container-low)]/50 hover:bg-red-500/10 text-[var(--on-surface-variant)] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>

                    <p className={`relative z-10 text-xl font-semibold leading-[1.4] mb-8 tracking-tight transition-colors duration-300 ${task.completed ? 'line-through text-[var(--on-surface-variant)]' : 'text-[var(--on-surface)] group-hover:text-[var(--primary)]'}`}>
                        {task.text}
                    </p>

                    <div className="relative z-10 mt-auto pt-5 border-t border-[var(--surface-container-low)]/50 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[var(--on-surface-variant)] group-hover:text-[var(--on-surface)] transition-colors">
                            <div className="p-1.5 rounded-lg bg-[var(--surface-container-low)]">
                                <Calendar size={14} />
                            </div>
                            <span className="text-[0.65rem] font-bold uppercase tracking-wider">
                                {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                        </div>
                        <button 
                            onClick={() => onToggleComplete(task._id, !task.completed)}
                            className={`p-2.5 rounded-2xl transition-all duration-500 ${
                                task.completed 
                                ? 'bg-[var(--primary)] text-white shadow-[0_4px_12px_rgba(0,106,60,0.3)] scale-95' 
                                : 'bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] hover:scale-110'
                            }`}
                        >
                            {task.completed ? <CheckCircle2 size={20} strokeWidth={2.5} /> : <Circle size={20} strokeWidth={2.5} />}
                        </button>
                    </div>
                </div>
            ))}

            {tasks.length === 0 && (
                <div className="col-span-full py-24 flex flex-col items-center justify-center opacity-40">
                    <div className="w-24 h-24 mb-6 rounded-full bg-[var(--surface-container-low)] flex items-center justify-center">
                        <CheckCircle2 size={40} className="text-[var(--on-surface-variant)]" />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--on-surface-variant)]">No active objectives</p>
                </div>
            )}
        </div>
    );
};

export default GridView;
