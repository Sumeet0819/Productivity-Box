const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        };
    }
    return { 'Content-Type': 'application/json' };
};

export const bootstrapUser = async () => {
    const res = await fetch(`${API_URL}/auth/bootstrap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error('Failed to bootstrap user');
    const data = await res.json();
    localStorage.setItem('user', JSON.stringify(data));
    return data;
};

export const authService = {
    login: async (email, password) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Login failed');
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    },
    register: async (name, email, password) => {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Registration failed');
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    },
    updateProfile: async (profileData) => {
        const res = await fetch(`${API_URL}/auth/profile`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(profileData)
        });
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Update failed');
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    },
    getMe: async () => {
        const res = await fetch(`${API_URL}/auth/me`, {
            headers: getAuthHeaders()
        });
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Failed to fetch user');
        return data;
    },
    logout: () => {
        localStorage.removeItem('user');
    }
};

export const fetchProfile = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    // Do not bootstrap if trying to implement true Auth.
    // If no user, we should be redirected to Login. 
    if (!user) throw new Error('Not authenticated');
    
    // Double check token validity
    const res = await fetch(`${API_URL}/auth/me`, {
        headers: getAuthHeaders()
    });
    if (!res.ok) {
        localStorage.removeItem('user');
        throw new Error('Not authenticated');
    }
    return await res.json();
};

export const todoService = {
    getTodos: async () => {
        const res = await fetch(`${API_URL}/todos`, { headers: getAuthHeaders() });
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    },
    getStats: async () => {
        const res = await fetch(`${API_URL}/todos/stats`, { headers: getAuthHeaders() });
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    },
    addTodo: async (text, status = 'todo') => {
        const res = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ text, status })
        });
        return await res.json();
    },
    updateTodo: async (id, updates) => {
        const res = await fetch(`${API_URL}/todos/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(updates)
        });
        return await res.json();
    },
    deleteTodo: async (id) => {
        const res = await fetch(`${API_URL}/todos/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return await res.json();
    }
};

export const financeService = {
    getStats: async () => {
        const res = await fetch(`${API_URL}/finance/stats`, { headers: getAuthHeaders() });
        if(!res.ok) return { balance: 0, earned: 0, spent: 0 };
        return await res.json();
    },
    getTransactions: async () => {
        const res = await fetch(`${API_URL}/finance`, { headers: getAuthHeaders() });
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    },
    addTransaction: async (amount, type, description, category) => {
        const res = await fetch(`${API_URL}/finance`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ 
                amount: Number(amount), 
                type,
                description: description || 'General Transaction',
                category: category || 'Others'
            })
        });
        return await res.json();
    },
    clearTransactions: async () => {
        const res = await fetch(`${API_URL}/finance/reset`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return await res.json();
    }
};

export const goalService = {
    getGoals: async () => {
        const res = await fetch(`${API_URL}/goals`, { headers: getAuthHeaders() });
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    },
    addGoal: async (text, type, color) => {
        const res = await fetch(`${API_URL}/goals`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ text, type, color })
        });
        return await res.json();
    },
    updateGoal: async (id, updates) => {
        const res = await fetch(`${API_URL}/goals/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(updates)
        });
        return await res.json();
    },
    deleteGoal: async (id) => {
        const res = await fetch(`${API_URL}/goals/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return await res.json();
    }
};
