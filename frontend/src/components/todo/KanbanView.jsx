import React from 'react';
import { MoreVertical, ChevronRight, ChevronLeft, Trash2, CheckCircle2, Clock, ListTodo } from 'lucide-react';

const KanbanView = ({ tasks, onToggleStatus, onDelete }) => {
    const columns = [
        { id: 'todo', title: 'To Do', icon: <ListTodo size={14} />, bg: 'bg-slate-500/10', text: 'text-slate-500' },
        { id: 'in-progress', title: 'In Progress', icon: <Clock size={14} />, bg: 'bg-amber-500/10', text: 'text-amber-500' },
        { id: 'done', title: 'Done', icon: <CheckCircle2 size={14} />, bg: 'bg-emerald-500/10', text: 'text-emerald-500' }
    ];

    const moveTask = (task, direction) => {
        const statuses = ['todo', 'in-progress', 'done'];
        const currentIndex = statuses.indexOf(task.status);
        const nextIndex = currentIndex + direction;
        if (nextIndex >= 0 && nextIndex < statuses.length) {
            onToggleStatus(task._id, statuses[nextIndex]);
        }
    };

    return (
        <div className="flex gap-6 h-full overflow-x-auto pb-4 custom-scrollbar">
            {columns.map(column => (
                <div key={column.id} className="flex-1 min-w-[320px] flex flex-col">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg ${column.bg} ${column.text}`}>
                                {column.icon}
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--on-surface-variant)]">
                                {column.title}
                            </h3>
                            <span className="ml-2 py-0.5 px-2 rounded-full bg-[var(--surface-container-low)] text-[0.6rem] font-bold text-[var(--on-surface-variant)]">
                                {tasks.filter(t => t.status === column.id).length}
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-4 p-2 rounded-[2rem] bg-[var(--surface-container-low)]/30 border border-[var(--surface-container-low)] overflow-y-auto custom-scrollbar">
                        {tasks.filter(t => t.status === column.id).map(task => (
                            <div 
                                key={task._id}
                                className="group p-5 rounded-2xl bg-[var(--surface-container-lowest)] shadow-sm border border-[var(--surface-container-low)] hover:shadow-md hover:border-[var(--primary)]/30 transition-all"
                            >
                                <div className="flex justify-between items-start gap-3 mb-4">
                                    <p className="text-sm font-semibold text-[var(--on-surface)] leading-relaxed">
                                        {task.text}
                                    </p>
                                    <button className="text-[var(--on-surface-variant)] opacity-0 group-hover:opacity-100 hover:text-[var(--on-surface)] transition-all">
                                        <MoreVertical size={14} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <button 
                                            disabled={column.id === 'todo'}
                                            onClick={() => moveTask(task, -1)}
                                            className="p-1.5 rounded-lg hover:bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] disabled:opacity-20"
                                        >
                                            <ChevronLeft size={14} />
                                        </button>
                                        <button 
                                            disabled={column.id === 'done'}
                                            onClick={() => moveTask(task, 1)}
                                            className="p-1.5 rounded-lg hover:bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] disabled:opacity-20"
                                        >
                                            <ChevronRight size={14} />
                                        </button>
                                    </div>

                                    <button 
                                        onClick={() => onDelete(task._id)}
                                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-[var(--on-surface-variant)] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {tasks.filter(t => t.status === column.id).length === 0 && (
                            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-20 py-10">
                                <ListTodo size={32} strokeWidth={1} />
                                <p className="text-[0.6rem] uppercase tracking-widest mt-2 font-bold">No Tasks</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KanbanView;
