import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer, Settings, X, Coffee } from 'lucide-react';

const PomoDoro = () => {
    const [workDuration, setWorkDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);
    const [isBreak, setIsBreak] = useState(false);
    
    const [timeLeft, setTimeLeft] = useState(workDuration * 60);
    const [isActive, setIsActive] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            if (!isBreak) {
                setIsBreak(true);
                setTimeLeft(breakDuration * 60);
            } else {
                setIsBreak(false);
                setTimeLeft(workDuration * 60);
            }
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, isBreak, breakDuration, workDuration]);

    const toggleTimer = () => setIsActive(prev => !prev);
    
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(isBreak ? breakDuration * 60 : workDuration * 60);
    };

    const handleSaveSettings = () => {
        setIsEditing(false);
        setIsActive(false);
        setIsBreak(false);
        setTimeLeft(workDuration * 60);
    };

    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');

    return (
        <>
            <div className="relative flex h-full max-h-[380px] flex-col items-center justify-between rounded-[2rem] bg-[var(--surface-container-lowest)] p-5 shadow-[var(--shadow-focus)]">
                <div className="absolute inset-x-6 top-6 h-24 rounded-[2rem] bg-[var(--surface-container-low)] blur-2xl opacity-50" />
                <div className="relative z-10 w-full flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2 rounded-full bg-[var(--surface-container-low)] px-3 py-2 text-[var(--on-surface-variant)]">
                            {isBreak ? <Coffee size={14} /> : <Timer size={14} />}
                            <span className="text-[0.6rem] uppercase tracking-[0.35em]">{isBreak ? 'Break time' : 'Focus session'}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="rounded-full bg-[var(--surface-container-low)] px-3 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">
                                {isBreak ? breakDuration : workDuration} min
                            </span>
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="rounded-full bg-[var(--surface-container-low)] px-2 py-1 text-[var(--on-surface-variant)] hover:text-white transition"
                            >
                                <Settings size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="relative mx-auto my-auto flex flex-col items-center justify-center text-center py-6">
                        <div className={`p-8 rounded-full border-2 ${isBreak ? 'border-sky-500/20 bg-sky-500/5' : 'border-[var(--primary)]/20 bg-[var(--primary)]/5'} transition-all duration-700`}>
                            <p className="text-4xl font-bold tracking-tight text-[var(--on-surface)] tabular-nums">
                                {minutes}:{seconds}
                            </p>
                            <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.4em] text-[var(--on-surface-variant)] font-bold">
                                {isActive ? 'Running' : 'Paused'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex w-full items-center justify-between gap-3">
                    <button
                        onClick={resetTimer}
                        className="inline-flex items-center justify-center rounded-full bg-[var(--surface-container-low)] p-3 text-[var(--on-surface-variant)] transition hover:bg-[var(--surface-container-lowest)]"
                    >
                        <RotateCcw size={16} strokeWidth={2.5} />
                    </button>
                    <button
                        onClick={toggleTimer}
                        style={{ backgroundColor: isBreak ? "#3b82f6" : undefined }}
                        className={`flex-1 inline-flex items-center justify-center rounded-full py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(0,33,15,0.12)] transition hover:scale-[1.02] active:scale-[0.98] ${!isBreak && "btn-primary"}`}
                    >
                        {isActive ? 'Pause' : (isBreak ? 'Start break' : 'Start focus')}
                    </button>
                </div>
            </div>

            {isEditing && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-sm bg-[var(--surface-container-lowest)] p-6 rounded-3xl shadow-2xl relative border border-[var(--surface-container-low)]">
                        <button 
                            onClick={() => setIsEditing(false)}
                            className="absolute top-4 right-4 text-[var(--on-surface-variant)] hover:text-[var(--on-surface)]"
                        >
                            <X size={20} />
                        </button>
                        <h3 className="text-xl font-bold text-[var(--on-surface)] mb-4">Timer Settings</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-[var(--on-surface-variant)] mb-1">Focus Duration (min)</label>
                                <input 
                                    type="number"
                                    min="1"
                                    className="w-full bg-[var(--surface-container-low)] rounded-xl px-4 py-3 outline-none text-[var(--on-surface)]"
                                    value={workDuration}
                                    onChange={(e) => setWorkDuration(Number(e.target.value))}
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-[var(--on-surface-variant)] mb-1">Break Duration (min)</label>
                                <input 
                                    type="number"
                                    min="1"
                                    className="w-full bg-[var(--surface-container-low)] rounded-xl px-4 py-3 outline-none text-[var(--on-surface)]"
                                    value={breakDuration}
                                    onChange={(e) => setBreakDuration(Number(e.target.value))}
                                />
                            </div>
                            <button 
                                onClick={handleSaveSettings}
                                className="w-full py-3 rounded-full btn-primary text-white font-semibold mt-2 shadow-[0_12px_24px_rgba(0,33,15,0.12)] transition hover:scale-[1.02]"
                            >
                                Save & Reset
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PomoDoro;
