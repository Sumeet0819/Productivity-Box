import React from 'react';
import { Trash2, CheckCircle2, Circle, Calendar, Tag } from 'lucide-react';

const GridView = ({ tasks, onToggleComplete, onDelete }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pr-2 custom-scrollbar">
            {tasks.map(task => (
                <div 
                    key={task._id}
                    className={`group flex flex-col p-6 rounded-3xl border transition-all ${
                        task.completed 
                        ? 'bg-[var(--surface-container-low)] border-transparent opacity-60' 
                        : 'bg-[var(--surface-container-lowest)] border-[var(--surface-container-low)] shadow-sm hover:shadow-xl hover:scale-[1.02] hover:border-[var(--primary)]/20'
                    }`}
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className={`px-3 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-widest ${
                            task.status === 'done' ? 'bg-emerald-500/10 text-emerald-500' :
                            task.status === 'in-progress' ? 'bg-amber-500/10 text-amber-500' :
                            'bg-slate-500/10 text-slate-500'
                        }`}>
                            {task.status}
                        </div>
                        <button 
                            onClick={() => onDelete(task._id)}
                            className="p-2 rounded-full hover:bg-red-500/10 text-[var(--on-surface-variant)] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>

                    <p className={`text-lg font-bold leading-tight mb-8 ${task.completed ? 'line-through' : 'text-[var(--on-surface)]'}`}>
                        {task.text}
                    </p>

                    <div className="mt-auto pt-6 border-t border-[var(--surface-container-low)] flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[var(--on-surface-variant)]">
                            <Calendar size={12} />
                            <span className="text-[0.6rem] font-bold uppercase tracking-wider">
                                {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                        </div>
                        <button 
                            onClick={() => onToggleComplete(task._id, !task.completed)}
                            className={`p-2 rounded-full transition-all ${
                                task.completed ? 'bg-emerald-500 text-white' : 'bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] hover:text-[var(--primary)]'
                            }`}
                        >
                            {task.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                        </button>
                    </div>
                </div>
            ))}

            {tasks.length === 0 && (
                <div className="col-span-full py-20 text-center opacity-30">
                    <p className="text-sm font-bold uppercase tracking-widest">No tasks active</p>
                </div>
            )}
        </div>
    );
};

export default GridView;
