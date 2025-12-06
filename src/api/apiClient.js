// src/api/apiClient.js
import axiosInstance from './axiosInstance';

export const BooksAPI = {
    // READ: Kitoblar ro'yxati (100 ta kitob)
    getBooks: (params) => {
        return axiosInstance.get('/books', { params });
    },

    // READ: Kitob detali
    getBookById: (id) => {
        return axiosInstance.get(`/books/${id}`);
    },

    // ADMIN - CREATE: Bitta kitob qo'shish
    addBook: (data) => {
        const formData = new FormData();
        for (const key in data) {
            if (key === 'coverImageFile' && data[key]) {
                formData.append('coverImage', data[key]);
            } else {
                formData.append(key, data[key]);
            }
        }
        return axiosInstance.post('/admin/books', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },

    updateBook: (id, data) => {
        return axiosInstance.put(`/admin/books/${id}`, data);
    },
    deleteBook: (id) => {
        return axiosInstance.delete(`/admin/books/${id}`);
    },

    // ADMIN - BATCH UPLOAD: Bir nechta kitobni yuklash
    uploadMultipleBooks: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return axiosInstance.post('/admin/books/upload-batch', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};

export const AuthAPI = {
    login: (data) => {
        return axiosInstance.post('/auth/login', data);
    },
};