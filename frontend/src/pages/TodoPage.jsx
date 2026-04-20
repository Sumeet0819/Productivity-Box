import React, { useState, useEffect } from 'react';
import SideBar from '../components/sidebar/SideBar';
import { todoService } from '../services/api';
import { List, LayoutGrid, Kanban, Plus, Search, Filter, Loader2 } from 'lucide-react';
import Todo from '../components/todo/Todo';
import KanbanView from '../components/todo/KanbanView';
import GridView from '../components/todo/GridView';

const TodoPage = () => {
    const [view, setView] = useState('kanban'); // 'list', 'kanban', 'grid'
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const data = await todoService.getTodos();
            setTasks(data);
        } catch (error) {
            console.error('Failed to load tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (id, newStatus) => {
        try {
            const updated = await todoService.updateTodo(id, { status: newStatus });
            setTasks(tasks.map(t => t._id === id ? updated : t));
        } catch (error) {
            console.error(error);
        }
    };

    const handleToggleComplete = async (id, completed) => {
        try {
            const updated = await todoService.updateTodo(id, { completed });
            setTasks(tasks.map(t => t._id === id ? updated : t));
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await todoService.deleteTodo(id);
            setTasks(tasks.filter(t => t._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const filteredTasks = tasks.filter(t => 
        t.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-[var(--surface)] text-[var(--on-surface)] overflow-hidden">
            <div className="fixed inset-y-0 left-0 flex flex-col justify-center px-8 z-50 pointer-events-none">
                <div className="pointer-events-auto">
                    <SideBar />
                </div>
            </div>

            <div className="flex-1 flex flex-col pl-[120px] pr-8 pb-8">
                <div className="w-full max-w-[1800px] h-full mx-auto flex flex-col py-8">
                    <header className="flex items-center justify-between mb-8">
                        <div>
                            <p className="text-[0.6rem] uppercase tracking-[0.35em] text-[var(--on-surface-variant)] font-bold">Execution Engine</p>
                            <h1 className="text-4xl font-bold tracking-tight mt-1 text-[var(--on-surface)]">Task Manager</h1>
                        </div>

                        <div className="flex items-center gap-6">
                            {/* Search Bar */}
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] transition-colors group-focus-within:text-[var(--primary)]" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Search objectives..." 
                                    className="pl-11 pr-6 py-2.5 bg-[var(--surface-container-low)] rounded-full text-xs font-semibold outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all border border-transparent focus:bg-[var(--surface-container-lowest)] w-[240px]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* View Switcher */}
                            <div className="flex p-1 rounded-2xl bg-[var(--surface-container-low)] border border-[var(--surface-container-high)] shadow-sm">
                                <button 
                                    onClick={() => setView('list')}
                                    className={`p-2 rounded-xl transition-all ${view === 'list' ? 'bg-[var(--surface-container-lowest)] text-[var(--primary)] shadow-md' : 'text-[var(--on-surface-variant)] hover:text-[var(--on-surface)]'}`}
                                    title="List View"
                                >
                                    <List size={18} />
                                </button>
                                <button 
                                    onClick={() => setView('kanban')}
                                    className={`p-2 rounded-xl transition-all ${view === 'kanban' ? 'bg-[var(--surface-container-lowest)] text-[var(--primary)] shadow-md' : 'text-[var(--on-surface-variant)] hover:text-[var(--on-surface)]'}`}
                                    title="Kanban View"
                                >
                                    <Kanban size={18} />
                                </button>
                                <button 
                                    onClick={() => setView('grid')}
                                    className={`p-2 rounded-xl transition-all ${view === 'grid' ? 'bg-[var(--surface-container-lowest)] text-[var(--primary)] shadow-md' : 'text-[var(--on-surface-variant)] hover:text-[var(--on-surface)]'}`}
                                    title="Grid View"
                                >
                                    <LayoutGrid size={18} />
                                </button>
                            </div>
                        </div>
                    </header>

                    <div className="flex-1 min-h-0">
                        {loading ? (
                            <div className="h-full flex items-center justify-center">
                                <Loader2 className="animate-spin text-[var(--primary)]" size={40} />
                            </div>
                        ) : (
                            <>
                                {view === 'list' && (
                                    <div className="h-full max-w-4xl mx-auto flex flex-col bg-[var(--surface-container-lowest)] rounded-[2.5rem] p-10 shadow-[var(--shadow-focus)] overflow-hidden border border-[var(--surface-container-low)]">
                                        <Todo fullScale={true} />
                                    </div>
                                )}

                                {view === 'kanban' && (
                                    <KanbanView 
                                        tasks={filteredTasks} 
                                        onToggleStatus={handleToggleStatus} 
                                        onDelete={handleDelete} 
                                    />
                                )}

                                {view === 'grid' && (
                                    <GridView 
                                        tasks={filteredTasks} 
                                        onToggleComplete={handleToggleComplete} 
                                        onDelete={handleDelete} 
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoPage;
