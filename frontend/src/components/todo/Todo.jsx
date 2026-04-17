import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2, ListTodo } from 'lucide-react';

const Todo = () => {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Review quarterly goals', completed: false },
        { id: 2, text: 'Design weather widget UI', completed: true },
        { id: 3, text: 'Sync with the backend team', completed: false }
    ]);
    const [newTaskText, setNewTaskText] = useState('');

    const toggleTask = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    const addTask = (e) => {
        e.preventDefault();
        if (newTaskText.trim() === '') return;
        setTasks([...tasks, { id: Date.now(), text: newTaskText.trim(), completed: false }]);
        setNewTaskText('');
    };

    const deleteTask = (id) => setTasks(tasks.filter(task => task.id !== id));
    const completedCount = tasks.filter(t => t.completed).length;
    const progress = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

    return (
        <div className="w-full min-h-[520px] rounded-[2rem] bg-[var(--surface-container-lowest)] p-8 shadow-[var(--shadow-focus)]">
            <div className="flex items-start justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(0,106,60,0.12)] text-[var(--primary)]">
                        <ListTodo size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                        <p className="text-[0.75rem] uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">Tasks</p>
                        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--on-surface)]">Today’s focus</h2>
                    </div>
                </div>
                <div className="rounded-full bg-[var(--surface-container-low)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">
                    {completedCount}/{tasks.length}
                </div>
            </div>

            <div className="grid gap-3 mb-8">
                <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-container-low)]">
                    <div className="h-full rounded-full bg-[var(--primary)] transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">
                    <span>{completedCount} completed</span>
                    <span>{progress}% progress</span>
                </div>
            </div>

            <div className="flex flex-col gap-3 mb-8 max-h-[260px] overflow-y-auto pr-1">
                {tasks.length === 0 ? (
                    <div className="rounded-[1.5rem] bg-[var(--surface-container-low)] p-8 text-center text-sm font-medium text-[var(--on-surface-variant)]">
                        All caught up! 🎉
                    </div>
                ) : (
                    tasks.map(task => (
                        <div
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            className={`group flex items-center justify-between gap-4 rounded-[1.75rem] p-4 transition-all ${
                                task.completed
                                    ? 'bg-[var(--surface-container-low)] text-[var(--on-surface-variant)]'
                                    : 'bg-[var(--surface)] hover:bg-[var(--surface-container-low)]'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                {task.completed ? (
                                    <CheckCircle2 size={18} className="text-[var(--primary)]" strokeWidth={2.5} />
                                ) : (
                                    <Circle size={18} className="text-[var(--on-surface-variant)] transition-colors group-hover:text-[var(--primary)]" strokeWidth={2.5} />
                                )}
                                <span className={`text-sm font-semibold ${task.completed ? 'line-through' : ''}`}>
                                    {task.text}
                                </span>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteTask(task.id);
                                }}
                                className="rounded-full p-2 text-[var(--on-surface-variant)] transition hover:text-red-500"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <form onSubmit={addTask} className="relative">
                <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="Add a new task"
                    className="w-full rounded-full border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] px-5 py-4 text-sm text-[var(--on-surface)] shadow-sm focus:outline-none focus:border-[var(--primary)]"
                />
                <button
                    type="submit"
                    disabled={newTaskText.trim() === ''}
                    className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary)] text-white transition hover:bg-[var(--primary-container)] disabled:opacity-50"
                >
                    <Plus size={16} strokeWidth={3.5} />
                </button>
            </form>
        </div>
    );
};

export default Todo;