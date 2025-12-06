// src/router/AppRouter.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import MainLayout from '../layouts/MainLayout';

// Sahifalar importi
import Login from '../pages/Auth/Login';
import Home from '../pages/Books/Home';
import BooksList from '../pages/Books/BooksList';
import BookDetail from '../pages/Books/BookDetail';
import Library from '../pages/Books/Library';
import BookAdd from '../pages/Admin/BookAdd';
import BookEdit from '../pages/Admin/BookEdit';
import BookUploadMultiple from '../pages/Admin/BookUploadMultiple';

// Protected Route komponenti
const ProtectedRoute = ({ children, isAdminRoute = false }) => {
    const { accessToken, isAdmin } = useAuthStore();

    if (!accessToken) return <Navigate to="/login" replace />;
    if (isAdminRoute && !isAdmin) return <Navigate to="/home" replace />;

    return children;
};

const AppRouter = () => {
    return (
        <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />

            {/* Auth required */}
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/books" element={<ProtectedRoute><BooksList /></ProtectedRoute>} />
            <Route path="/books/:id" element={<ProtectedRoute><BookDetail /></ProtectedRoute>} />
            <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />

            {/* Admin routes */}
            <Route path="/admin/book/add" element={<ProtectedRoute isAdminRoute><BookAdd /></ProtectedRoute>} />
            <Route path="/admin/book/edit/:id" element={<ProtectedRoute isAdminRoute><BookEdit /></ProtectedRoute>} />
            <Route path="/admin/book/upload-batch" element={<ProtectedRoute isAdminRoute><BookUploadMultiple /></ProtectedRoute>} />

            {/* Default & 404 */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route
                path="*"
                element={
                    <MainLayout>
                        <div className="text-center p-20 text-4xl dark:text-white">
                            404 | Sahifa topilmadi
                        </div>
                    </MainLayout>
                }
            />
        </Routes>
    );
};

export default AppRouter;
