import React from "react";

const Profile = () => {
    return (
        <div className="relative overflow-hidden rounded-[2rem] bg-[var(--surface-container-lowest)] shadow-[var(--shadow-focus)]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,106,60,0.12)_0%,rgba(255,255,255,0.02)_60%)] pointer-events-none" />
            <img
                src="https://i.pinimg.com/736x/f6/9d/11/f69d11ff449d7c0ef2dc13c65321b6a5.jpg"
                alt="profile"
                className="h-[420px] w-full object-cover"
            />

            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-transparent">
                <span className="text-[0.7rem] uppercase tracking-[0.35em] text-[var(--surface)]">
                    Featured
                </span>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                    Marline Betbye
                </h2>
                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-200">
                    Curating productive rituals for a thoughtful day in the botanical workspace.
                </p>
            </div>
        </div>
    );
};

export default Profile;