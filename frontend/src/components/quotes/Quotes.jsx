import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const Quotes = () => {
    const [quote, setQuote] = useState({ text: 'Loading inspiring thought...', author: '' });

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const res = await fetch('https://dummyjson.com/quotes/random');
                const data = await res.json();
                setQuote({ text: data.quote, author: data.author });
            } catch (err) {
                setQuote({ text: 'Focus on being productive instead of busy.', author: 'Tim Ferriss' });
            }
        };
        fetchQuote();
    }, []);

    return (
        <div className="relative flex flex-col justify-between rounded-[2rem] bg-[var(--surface-container-lowest)] p-4 shadow-[var(--shadow-focus)] min-h-[160px]">
            <div className="absolute inset-x-6 top-4 h-16 rounded-[2rem] bg-[var(--surface-container-low)] blur-2xl opacity-50" />
            
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                    <div className="rounded-full bg-[var(--primary)]/20 p-1.5 text-[var(--primary)]">
                        <Quote size={12} />
                    </div>
                    <span className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-[var(--on-surface-variant)]">
                        Daily Motivation
                    </span>
                </div>
                
                <p className="text-base font-medium leading-normal italic text-[var(--on-surface)]">
                    "{quote.text}"
                </p>
                
                <p className="mt-2 text-xs font-semibold tracking-wide text-[var(--primary)] text-right">
                    — {quote.author}
                </p>
            </div>
        </div>
    );
};

export default Quotes;
