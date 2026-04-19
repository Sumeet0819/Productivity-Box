import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Plus, Trash2, ListTodo } from 'lucide-react';
import { todoService, fetchProfile } from '../../services/api';

const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const [newTaskText, setNewTaskText] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTodos = async () => {
            try {
                await fetchProfile(); // Ensure user is bootstrapped
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
        if(!taskToUpdate) return;
        
        // Optimistic UI update
        setTasks(tasks.map(task => task._id === id ? { ...task, completed: !task.completed } : task));
        
        try {
            await todoService.updateTodo(id, { completed: !taskToUpdate.completed });
        } catch(error) {
            console.error('Failed to toggle task', error);
            // Revert state if failed
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
        <div className="flex flex-col w-full h-full rounded-[2rem] bg-[var(--surface-container-lowest)] p-6 shadow-[var(--shadow-focus)]">
            <div className="flex items-start justify-between gap-4 mb-5">
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

            <div className="grid gap-3 mb-5">
                <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-container-low)]">
                    <div className="h-full rounded-full bg-[var(--primary)] transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">
                    <span>{completedCount} completed</span>
                    <span>{progress}% progress</span>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-2.5 mb-5 overflow-y-auto pr-1">
                {tasks.length === 0 ? (
                    <div className="rounded-[1.5rem] bg-[var(--surface-container-low)] p-6 text-center text-sm font-medium text-[var(--on-surface-variant)]">
                        All caught up! 🎉
                    </div>
                ) : (
                    tasks.map(task => (
                        <div
                            key={task._id}
                            onClick={() => toggleTask(task._id)}
                            className={`group flex items-center justify-between gap-4 rounded-[1.5rem] p-3 transition-all ${task.completed
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
                                    deleteTask(task._id);
                                }}
                                className="rounded-full p-2 text-[var(--on-surface-variant)] transition hover:text-red-500"
                            >
                                <Trash2 size={16} />
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