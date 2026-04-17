import React from 'react'
import Weather from '../components/weather/Weather'
import Todo from '../components/todo/Todo'
import PomoDoro from '../components/pomodoro/PomoDoro'
import SideBar from '../components/sidebar/SideBar'
import LastPlayedMusic from '../components/music/LastPlayedMusic'

const Home = () => {
    return (
        <div className="min-h-screen bg-[var(--surface)] px-6 py-8 text-[var(--on-surface)]">
            <div className="mx-auto grid max-w-8xl gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
                <aside className="space-y-6 xl:sticky xl:top-8">
                    <SideBar />
                </aside>

                <main className="space-y-10">
                    <header className="flex flex-col gap-4">
                        <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">
                            Botanical Workspace
                        </p>
                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <h1 className="text-4xl font-semibold tracking-tight text-[var(--on-surface)]">
                                    Dashboard
                                </h1>
                                <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
                                    A calm, editorial workspace layered with soft paper-like surfaces, tonal greens, and generous breathing room.
                                </p>
                            </div>
                            <div className="inline-flex items-center rounded-full bg-[var(--surface-container-low)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                            </div>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
                        <div className="space-y-6 xl:col-span-1">
                            <Weather />
                            <LastPlayedMusic />

                        </div>
                        <div className="space-y-6 xl:col-span-1">
                            <PomoDoro />
                        </div>
                        <div className="space-y-6 xl:col-span-2">
                            <Todo />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Home