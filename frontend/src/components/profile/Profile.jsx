import React, { useState, useEffect } from "react";
import { fetchProfile, authService } from '../../services/api';
import { Settings, LogOut, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ name: '', bio: '', profilePicture: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await fetchProfile();
                setUser(data);
                setEditData({ name: data.name, bio: data.bio, profilePicture: data.profilePicture || '' });
            } catch (error) {
                console.error(error);
                navigate('/login');
            }
        };
        loadProfile();
    }, [navigate]);

    const handleSave = async () => {
        try {
            const updatedUser = await authService.updateProfile(editData);
            setUser(updatedUser);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    if (!user) return (
        <div className="relative overflow-hidden rounded-[2rem] bg-[var(--surface-container-lowest)] shadow-[var(--shadow-focus)] h-[420px] animate-pulse" />
    );

    return (
        <>
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

                {/* Top Actions */}
                <div className="absolute top-4 right-4 flex gap-2 z-20">
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition backdrop-blur-md"
                    >
                        <Settings size={18} />
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="p-2 rounded-full bg-black/40 text-white hover:bg-red-500/80 transition backdrop-blur-md"
                    >
                        <LogOut size={18} />
                    </button>
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

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-[var(--surface-container-lowest)] p-6 rounded-3xl shadow-2xl relative border border-[var(--surface-container-low)]">
                        <button 
                            onClick={() => setIsEditing(false)}
                            className="absolute top-4 right-4 text-[var(--on-surface-variant)] hover:text-[var(--on-surface)]"
                        >
                            <X size={20} />
                        </button>
                        <h3 className="text-xl font-bold text-[var(--on-surface)] mb-4">Edit Profile</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-[var(--on-surface-variant)] mb-1">Name</label>
                                <input 
                                    className="w-full bg-[var(--surface-container-low)] rounded-xl px-4 py-3 outline-none text-[var(--on-surface)]"
                                    value={editData.name}
                                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-[var(--on-surface-variant)] mb-1">Bio</label>
                                <textarea 
                                    className="w-full bg-[var(--surface-container-low)] rounded-xl px-4 py-3 outline-none text-[var(--on-surface)] resize-none"
                                    rows={3}
                                    value={editData.bio}
                                    onChange={(e) => setEditData({...editData, bio: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-[var(--on-surface-variant)] mb-1">Avatar URL</label>
                                <input 
                                    className="w-full bg-[var(--surface-container-low)] rounded-xl px-4 py-3 outline-none text-[var(--on-surface)]"
                                    value={editData.profilePicture}
                                    onChange={(e) => setEditData({...editData, profilePicture: e.target.value})}
                                />
                            </div>
                            <button 
                                onClick={handleSave}
                                className="w-full py-3 rounded-full btn-primary text-white font-semibold mt-2 shadow-[0_12px_24px_rgba(0,33,15,0.12)] transition hover:scale-[1.02]"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;