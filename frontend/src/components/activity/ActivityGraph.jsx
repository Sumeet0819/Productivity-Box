import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Loader2 } from 'lucide-react';
import { todoService } from '../../services/api';

const ActivityGraph = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const stats = await todoService.getStats();
                setData(stats);
            } catch (error) {
                console.error('Failed to load stats:', error);
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, []);

    if (loading) {
        return (
            <div className="relative flex h-full min-h-[220px] items-center justify-center rounded-[2rem] bg-[var(--surface-container-lowest)] p-6 shadow-[var(--shadow-focus)]">
                <Loader2 className="animate-spin text-[var(--primary)]" size={24} />
            </div>
        );
    }

    return (
        <div className="relative flex h-full flex-col rounded-[2rem] bg-[var(--surface-container-lowest)] p-6 shadow-[var(--shadow-focus)]">
             <div className="absolute inset-x-6 top-6 h-24 rounded-[2rem] bg-[var(--surface-container-low)] blur-2xl opacity-50 pointer-events-none" />
             
             <div className="relative z-10 flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="rounded-full bg-[var(--primary)]/10 p-2 text-[var(--primary)]">
                        <Activity size={16} />
                    </div>
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[var(--on-surface-variant)]">
                        Weekly Performance
                    </span>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                        <span className="text-[0.6rem] uppercase tracking-wider text-[var(--on-surface-variant)]">Created</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-slate-400" />
                        <span className="text-[0.6rem] uppercase tracking-wider text-[var(--on-surface-variant)]">Done</span>
                    </div>
                </div>
             </div>

             <div className="relative z-10 flex-1 w-full min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--surface-container-low)" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 10, fill: 'var(--on-surface-variant)' }}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 10, fill: 'var(--on-surface-variant)' }} 
                        />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: 'var(--surface-container-low)', 
                                border: 'none', 
                                borderRadius: '1rem',
                                fontSize: '0.75rem',
                                color: 'var(--on-surface)'
                            }}
                            itemStyle={{ color: 'var(--on-surface)' }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="active" 
                            stroke="var(--primary)" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorActive)" 
                        />
                        <Area 
                            type="monotone" 
                            dataKey="todo" 
                            stroke="#94a3b8" 
                            strokeWidth={2}
                            fill="transparent" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
             </div>
        </div>
    );
};

export default ActivityGraph;
