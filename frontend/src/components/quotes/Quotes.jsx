import React, { useState, useEffect } from 'react';
import { Quote, Sparkles } from 'lucide-react';

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
        <div className="relative group overflow-hidden rounded-[2.5rem] bg-[var(--surface-container-lowest)] p-8 shadow-[var(--shadow-focus)] transition-all duration-500 hover:shadow-2xl h-full flex flex-col">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Dynamic Blur blobs */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[var(--primary)]/10 blur-[80px] group-hover:bg-[var(--primary)]/20 transition-all duration-700" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[var(--primary)]/5 blur-[80px] group-hover:bg-[var(--primary)]/10 transition-all duration-700" />
            
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[var(--primary)] blur-md opacity-20 animate-pulse" />
                            <div className="relative rounded-full bg-[var(--primary)] p-2 text-white shadow-lg shadow-[var(--primary)]/20">
                                <Quote size={14} fill="currentColor" />
                            </div>
                        </div>
                        <span className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">
                            Daily Motivation
                        </span>
                    </div>
                    <Sparkles size={14} className="text-[var(--primary)]/40 group-hover:text-[var(--primary)] group-hover:rotate-12 transition-all duration-500" />
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                    <p className="text-lg font-medium leading-[1.6] italic text-[var(--on-surface)] tracking-tight">
                        <span className="text-3xl text-[var(--primary)]/20 font-serif leading-none mr-1 inline-block -translate-y-2">"</span>
                        {quote.text}
                        <span className="text-3xl text-[var(--primary)]/20 font-serif leading-none ml-1 inline-block translate-y-1">"</span>
                    </p>
                </div>
                
                <div className="mt-8 flex items-center justify-end gap-3">
                    <div className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--primary)]/30" />
                    <p className="text-[0.7rem] font-bold tracking-[0.1em] text-[var(--primary)] uppercase">
                        {quote.author || 'Anonymous'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Quotes;
