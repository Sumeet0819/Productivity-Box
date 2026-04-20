import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, bootstrapUser } from '../services/api';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                await authService.login(email, password);
            } else {
                await authService.register(name, email, password);
            }
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGuest = async () => {
        try {
            await bootstrapUser();
            navigate('/');
        } catch (err) {
            setError('Failed to load guest account');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[var(--surface)] text-[var(--on-surface)]">
            <div className="w-full max-w-md p-8 rounded-[2rem] bg-[var(--surface-container-lowest)] shadow-[var(--shadow-focus)]">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-[var(--on-surface)]">
                        Productivity Box
                    </h1>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">
                        {isLogin ? 'Welcome back to your command center' : 'Create your personal hub'}
                    </p>
                </div>

                {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-2xl bg-[var(--surface-container-low)] px-4 py-3 text-sm text-[var(--on-surface)] outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-2xl bg-[var(--surface-container-low)] px-4 py-3 text-sm text-[var(--on-surface)] outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-2xl bg-[var(--surface-container-low)] px-4 py-3 text-sm text-[var(--on-surface)] outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                    />

                    <button
                        type="submit"
                        className="mt-2 w-full rounded-full py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(0,33,15,0.12)] transition hover:scale-[1.02] active:scale-[0.98] btn-primary"
                    >
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition"
                    >
                        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Auth;
