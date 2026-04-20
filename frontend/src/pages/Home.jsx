import React from 'react'
import { Link } from 'react-router-dom'
import { Maximize2, Sparkles } from 'lucide-react'
import Weather from '../components/weather/Weather'
import Todo from '../components/todo/Todo'
import PomoDoro from '../components/pomodoro/PomoDoro'
import SideBar from '../components/sidebar/SideBar'
import FinanceTracker from '../components/finance/FinanceTracker'
import Profile from '../components/profile/Profile'
import Calender from '../components/calender/Calender'
import ActivityGraph from '../components/activity/ActivityGraph'
import Goals from '../components/goals/Goals'
import Quotes from '../components/quotes/Quotes'

const DashboardSection = ({ title, to, children, className = "" }) => (
    <div className={`flex flex-col gap-2 mt-4 ${className}`}>
        <div className="flex items-center justify-between px-2">
            <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[var(--on-surface-variant)] flex items-center gap-2">
                <Sparkles size={10} className="text-[var(--primary)]" />
                {title}
            </h3>
            {to && (
                <Link to={to} className="p-1.5 rounded-full hover:bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-all">
                    <Maximize2 size={12} />
                </Link>
            )}
        </div>
        <div className="flex-1">
            {children}
        </div>
    </div>
);

const Home = () => {
    return (
        <div className="flex min-h-screen bg-[var(--surface)] text-[var(--on-surface)]">
            <div className="fixed inset-y-0 left-0 flex flex-col justify-center px-8 z-50 pointer-events-none">
                <div className="pointer-events-auto">
                    <SideBar />
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center pl-[120px] pr-6 py-8">
                <div className="w-full max-w-[2000px] mx-auto">
                    <main className="space-y-10 min-w-0">
                        <header className="flex flex-col gap-4">
                            <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">
                                Command Center
                            </p>
                            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                                <div>
                                    <h1 className="text-5xl font-bold tracking-tight text-[var(--on-surface)]">
                                        Productivity Box
                                    </h1>
                                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
                                        Your neural workspace for high-performance living.
                                    </p>
                                </div>
                                <div className="inline-flex items-center rounded-full bg-[var(--surface-container-low)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">
                                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                </div>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 items-stretch gap-8 xl:grid-cols-12">
                            {/* Column 1 */}
                            <div className="xl:col-span-3 flex flex-col gap-8">
                                <DashboardSection title="Identity" className="h-[420px]">
                                    <Profile />
                                </DashboardSection>
                                <DashboardSection title="Velocity" className="h-full">
                                    <ActivityGraph />
                                </DashboardSection>
                            </div>

                            {/* Column 2 */}
                            <div className="xl:col-span-3 flex flex-col gap-8">
                                <DashboardSection title="Atmosphere">
                                    <Weather />
                                </DashboardSection>
                                <DashboardSection title="Objectives" to="/goals" className="flex-1">
                                    <Goals />
                                </DashboardSection>
                            </div>

                            {/* Column 3 */}
                            <div className="xl:col-span-3 flex flex-col gap-8">
                                <DashboardSection title="Capital" to="/finance" className="h-full">
                                    <FinanceTracker />
                                </DashboardSection>
                                <DashboardSection title="Deep Work" className="h-full">
                                    <PomoDoro />
                                </DashboardSection>
                                <DashboardSection title="Insight" className="h-full">
                                    <Quotes />
                                </DashboardSection>
                            </div>

                            {/* Column 4 */}
                            <div className="xl:col-span-3 flex flex-col gap-8">
                                <DashboardSection title="Execution" to="/todo" className="h-full">
                                    <Todo />
                                </DashboardSection>
                                <DashboardSection title="Timeline" className="h-full">
                                    <Calender />
                                </DashboardSection>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Home
