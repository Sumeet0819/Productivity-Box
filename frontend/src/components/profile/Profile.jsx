import React, { useState, useEffect } from "react";
import { fetchProfile } from '../../services/api';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await fetchProfile();
                setUser(data);
            } catch (error) {
                console.error(error);
            }
        };
        loadProfile();
    }, []);

    if (!user) return (
        <div className="relative overflow-hidden rounded-[2rem] bg-[var(--surface-container-lowest)] shadow-[var(--shadow-focus)] h-[420px] animate-pulse" />
    );

    return (
        <div className="relative overflow-hidden rounded-[2rem] bg-[var(--surface-container-lowest)] shadow-[var(--shadow-focus)]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,106,60,0.12)_0%,rgba(255,255,255,0.02)_60%)] pointer-events-none" />
            <img
                src={user.profilePicture || "https://i.pinimg.com/736x/ad/44/ef/ad44efff26f604077495754d6331bb5e.jpg"}
                alt="profile"
                className="h-[420px] w-full object-cover"
            />

            {/* Feathery Masked Blur & Grain Layer */}
            <div
                className="absolute inset-x-0 bottom-0 h-3/5 pointer-events-none"
                style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)'
                }}
            >
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.9),rgba(0,0,0,0.4)_50%,transparent)] backdrop-blur-3xl" />
                <div
                    className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />
            </div>

            {/* Text Content */}
            <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                <span className="text-[0.7rem] uppercase tracking-[0.35em] text-[var(--surface)]">
                    Featured
                </span>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                    {user.name}
                </h2>
                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-300">
                    {user.bio}
                </p>
            </div>
        </div>
    );
};

export default Profile;