import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calender = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [viewDate, setViewDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const currentMonth = viewDate.getMonth();
    const currentYear = viewDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const handlePrevMonth = () => setViewDate(new Date(currentYear, currentMonth - 1, 1));
    const handleNextMonth = () => setViewDate(new Date(currentYear, currentMonth + 1, 1));
    const resetToToday = () => setViewDate(new Date());

    const isRealTimeToday = (day) => day === currentTime.getDate() && currentMonth === currentTime.getMonth() && currentYear === currentTime.getFullYear();

    const renderCalendarDays = () => {
        const days = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="w-9 h-9" />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = isRealTimeToday(day);
            days.push(
                <div key={day} className="relative flex items-center justify-center w-9 h-9">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                        isToday
                            ? 'bg-[var(--primary)] text-white shadow-[0_0_0_8px_rgba(0,106,60,0.08)]'
                            : 'bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-lowest)]'
                    }`}>
                        <span className="text-[13px] font-semibold">{day}</span>
                    </div>
                </div>
            );
        }

        return days;
    };

    return (
        <div className="w-full min-h-[420px] rounded-[2rem] bg-[var(--surface-container-lowest)] p-7 shadow-[var(--shadow-focus)]">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[0.75rem] uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">Calendar</p>
                        <button onClick={resetToToday} className="mt-2 text-lg font-semibold tracking-tight text-[var(--on-surface)] hover:text-[var(--primary)] transition-colors">
                            {viewDate.toLocaleString('default', { month: 'long' })} {currentYear}
                        </button>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-[var(--surface-container-low)] px-3 py-2 text-[var(--on-surface-variant)]">
                        <button onClick={handlePrevMonth} className="rounded-full p-2 text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-lowest)] transition-colors">
                            <ChevronLeft size={18} strokeWidth={2.2} />
                        </button>
                        <button onClick={handleNextMonth} className="rounded-full bg-[var(--primary)] p-2 text-white hover:bg-[var(--primary-container)] transition-colors">
                            <ChevronRight size={18} strokeWidth={2.2} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-y-2 gap-x-1.5 place-items-center mt-3">
                    {renderCalendarDays()}
                </div>
            </div>
        </div>
    );
};

export default Calender;