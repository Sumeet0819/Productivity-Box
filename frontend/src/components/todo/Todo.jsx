import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Plus, Trash2, ListTodo } from 'lucide-react';
import { todoService, fetchProfile } from '../../services/api';

const Todo = ({ fullScale = false }) => {
    const [tasks, setTasks] = useState([]);
    const [newTaskText, setNewTaskText] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTodos = async () => {
            try {
                const fetchedTodos = await todoService.getTodos();
                setTasks(fetchedTodos);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        loadTodos();
    }, []);

    const toggleTask = async (id) => {
        const taskToUpdate = tasks.find(t => t._id === id);
        if (!taskToUpdate) return;

        setTasks(tasks.map(task => task._id === id ? { ...task, completed: !task.completed } : task));

        try {
            await todoService.updateTodo(id, { completed: !taskToUpdate.completed });
        } catch (error) {
            console.error('Failed to toggle task', error);
            setTasks(tasks.map(task => task._id === id ? { ...task, completed: taskToUpdate.completed } : task));
        }
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (newTaskText.trim() === '') return;

        const text = newTaskText.trim();
        setNewTaskText('');

        try {
            const newTask = await todoService.addTodo(text);
            setTasks([...tasks, newTask]);
        } catch (error) {
            console.error('Failed to add task', error);
        }
    };

    const deleteTask = async (id) => {
        setTasks(tasks.filter(task => task._id !== id));
        try {
            await todoService.deleteTodo(id);
        } catch (error) {
            console.error('Failed to delete task', error);
        }
    };

    const completedCount = tasks.filter(t => t.completed).length;
    const progress = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

    return (
        <div className={`flex flex-col w-full h-full ${!fullScale ? 'rounded-[2rem] bg-[var(--surface-container-lowest)] p-6 shadow-[var(--shadow-focus)]' : ''}`}>
            <div className={`flex items-start justify-between gap-4 ${fullScale ? 'mb-10' : 'mb-5'}`}>
                <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center rounded-full bg-[rgba(0,106,60,0.12)] text-[var(--primary)] ${fullScale ? 'h-14 w-14' : 'h-11 w-11'}`}>
                        <ListTodo size={fullScale ? 24 : 20} strokeWidth={2.5} />
                    </div>
                    <div>
                        <p className={`${fullScale ? 'text-[0.85rem]' : 'text-[0.75rem]'} uppercase tracking-[0.35em] text-[var(--on-surface-variant)]`}>Tasks</p>
                        <h2 className={`mt-2 ${fullScale ? 'text-4xl' : 'text-2xl'} font-semibold tracking-tight text-[var(--on-surface)]`}>Today’s focus</h2>
                    </div>
                </div>
                <div className="rounded-full bg-[var(--surface-container-low)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">
                    {completedCount}/{tasks.length}
                </div>
            </div>

            <div className={`grid gap-3 ${fullScale ? 'mb-12' : 'mb-5'}`}>
                <div className={`${fullScale ? 'h-3' : 'h-2'} overflow-hidden rounded-full bg-[var(--surface-container-low)]`}>
                    <div className="h-full rounded-full bg-[var(--primary)] transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">
                    <span>{completedCount} completed</span>
                    <span>{progress}% progress</span>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-2.5 mb-5 overflow-y-auto pr-2 custom-scrollbar">
                {tasks.length === 0 ? (
                    <div className="rounded-[1.5rem] bg-[var(--surface-container-low)] p-12 text-center text-sm font-medium text-[var(--on-surface-variant)] opacity-50">
                        <ListTodo size={40} className="mx-auto mb-4 opacity-20" />
                        All caught up! 🎉
                    </div>
                ) : (
                    tasks.map(task => (
                        <div
                            key={task._id}
                            onClick={() => toggleTask(task._id)}
                            className={`group flex items-center justify-between gap-4 rounded-[1.5rem] p-4 transition-all ${task.completed
                                ? 'bg-[var(--surface-container-low)] text-[var(--on-surface-variant)]'
                                : 'bg-[var(--surface-container-low)]/40 hover:bg-[var(--surface-container-low)]'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                {task.completed ? (
                                    <CheckCircle2 size={22} className="text-[var(--primary)]" strokeWidth={2.5} />
                                ) : (
                                    <Circle size={22} className="text-[var(--on-surface-variant)] transition-colors group-hover:text-[var(--primary)]" strokeWidth={2.5} />
                                )}
                                <span className={`text-base font-regular ${task.completed ? 'line-through opacity-50' : 'text-[var(--on-surface)]'}`}>
                                    {task.text}
                                </span>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteTask(task._id);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-2 text-[var(--on-surface-variant)] transition hover:text-red-500 hover:bg-red-500/10 rounded-full"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <form onSubmit={addTask} className="relative mt-auto">
                <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="Add a new milestone..."
                    className={`w-full rounded-[2rem] border border-[var(--surface-container-low)] bg-[var(--surface-container-low)]/50 ${fullScale ? 'px-8 py-5 text-lg' : 'px-6 py-4 text-sm'} text-[var(--on-surface)] transition-all focus:outline-none focus:bg-[var(--surface-container-lowest)] focus:ring-4 focus:ring-[var(--primary)]/5`}
                />
                <button
                    type="submit"
                    disabled={newTaskText.trim() === ''}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-[var(--primary)] text-white transition hover:scale-105 active:scale-95 disabled:opacity-30 ${fullScale ? 'h-14 w-14' : 'h-11 w-11'}`}
                >
                    <Plus size={fullScale ? 24 : 18} strokeWidth={3.5} />
                </button>
            </form>
        </div>
    );
};

export default Todo;