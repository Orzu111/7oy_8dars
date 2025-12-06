// src/store/authStore.js
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    accessToken: localStorage.getItem('accessToken') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAdmin: false,

    login: (token, userData) => {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        set({ accessToken: token, user: userData, isAdmin: userData.role === 'ADMIN' });
    },

    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        set({ accessToken: null, user: null, isAdmin: false });
    },
}));
export default useAuthStore;