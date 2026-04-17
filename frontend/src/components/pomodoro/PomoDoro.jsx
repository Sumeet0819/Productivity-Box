import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

const WORK_MINUTES = 25;

const PomoDoro = () => {
    const [timeLeft, setTimeLeft] = useState(WORK_MINUTES * 60);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(prev => !prev);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(WORK_MINUTES * 60);
    };

    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    const totalSeconds = WORK_MINUTES * 60;
    const progress = timeLeft / totalSeconds;
    const radius = 82;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - progress * circumference;

    return (
        <div className="relative flex min-h-[520px] flex-col items-center justify-between rounded-[2rem] bg-[var(--surface-container-lowest)] px-8 py-10 shadow-[var(--shadow-focus)]">
            <div className="absolute inset-x-6 top-6 h-40 rounded-[2rem] bg-[var(--surface-container-low)] blur-2xl opacity-50" />
            <div className="relative z-10 w-full">
                <div className="flex items-center justify-between gap-3 mb-8">
                    <div className="flex items-center gap-3 rounded-full bg-[var(--surface-container-low)] px-4 py-3 text-[var(--on-surface-variant)]">
                        <Timer size={18} />
                        <span className="text-xs uppercase tracking-[0.35em]">Focus session</span>
                    </div>
                    <span className="rounded-full bg-[var(--surface-container-low)] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">
                        {WORK_MINUTES} min
                    </span>
                </div>

                <div className="relative mx-auto mb-8 flex h-[210px] w-[210px] items-center justify-center">
                    <svg width="210" height="210" className="-rotate-90">
                        <circle
                            cx="105"
                            cy="105"
                            r={radius}
                            fill="none"
                            stroke="var(--surface-container-low)"
                            strokeWidth="18"
                        />
                        <circle
                            cx="105"
                            cy="105"
                            r={radius}
                            fill="none"
                            stroke="var(--primary)"
                            strokeWidth="18"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <p className="text-5xl font-semibold tracking-tight text-[var(--on-surface)] tabular-nums">
                            {minutes}:{seconds}
                        </p>
                        <span className="mt-2 text-[0.72rem] uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">
                            {isActive ? 'Running' : 'Paused'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex w-full items-center justify-between gap-4">
                <button
                    onClick={resetTimer}
                    className="inline-flex items-center justify-center rounded-full bg-[var(--surface-container-low)] px-4 py-3 text-[var(--on-surface-variant)] transition hover:bg-[var(--surface-container-lowest)]"
                >
                    <RotateCcw size={20} />
                </button>
                <button
                    onClick={toggleTimer}
                    className="inline-flex min-w-[140px] items-center justify-center rounded-full px-6 py-4 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(0,33,15,0.12)] transition hover:scale-[1.02] btn-primary"
                >
                    {isActive ? 'Pause' : 'Start focus'}
                </button>
            </div>
        </div>
    );
};

export default PomoDoro;
