import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, ListTodo, Wallet, Target, LogOut } from 'lucide-react'
import { authService } from '../../services/api'

const SideBar = () => {
    const location = useLocation();
    const activeTab = location.pathname;

    const handleLogout = () => {
        authService.logout();
        window.location.href = '/login';
    };

    const getIconClass = (path) => `transition-all duration-300 cursor-pointer ${activeTab === path
        ? 'text-[var(--primary)] drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)] scale-110'
        : 'text-[var(--on-surface-variant)] hover:text-[var(--primary)] opacity-60 hover:opacity-100 hover:scale-105'
        }`;


    return (
        <div className="space-y-6 h-[90vh] flex flex-col items-center justify-between py-10">
            <div className='flex flex-col items-center justify-center gap-12 h-full'>
                <div className='flex flex-col items-center justify-between gap-10 rounded-[2rem] bg-[var(--surface-container-lowest)] p-5 shadow-[var(--shadow-focus)]'>
                    <Link to="/">
                        <Home size={24} className={getIconClass('/')} title="Dashboard" />
                    </Link>
                </div>
                
                <div className='flex flex-col items-center justify-between gap-10 rounded-[2rem] bg-[var(--surface-container-lowest)] p-5 shadow-[var(--shadow-focus)]'>
                    <Link to="/todo">
                        <ListTodo size={24} className={getIconClass('/todo')} title="Task Manager" />
                    </Link>
                    <Link to="/finance">
                        <Wallet size={24} className={getIconClass('/finance')} title="Finance Hub" />
                    </Link>
                    <Link to="/goals">
                        <Target size={24} className={getIconClass('/goals')} title="Strategic Goals" />
                    </Link>
                </div>
            </div>

            <div className='flex flex-col items-center justify-between gap-5 rounded-[2rem] bg-[var(--surface-container-lowest)] p-4 shadow-[var(--shadow-focus)]'>
                <button onClick={handleLogout} className="group relative">
                    <LogOut size={24} className="text-red-400 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all cursor-pointer" title="Logout" />
                </button>
            </div>
        </div>
    )
}

export default SideBar