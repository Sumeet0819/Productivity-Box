const API_URL = 'http://localhost:5000/api';

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

export const fetchProfile = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return await bootstrapUser();
    
    // Double check token validity
    const res = await fetch(`${API_URL}/auth/me`, {
        headers: getAuthHeaders()
    });
    if (!res.ok) {
        localStorage.removeItem('user');
        return await bootstrapUser();
    }
    return await res.json();
};

export const todoService = {
    getTodos: async () => {
        const res = await fetch(`${API_URL}/todos`, { headers: getAuthHeaders() });
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    },
    addTodo: async (text) => {
        const res = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ text })
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
    addTransaction: async (amount, type) => {
        const res = await fetch(`${API_URL}/finance`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ amount: Number(amount), type })
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
