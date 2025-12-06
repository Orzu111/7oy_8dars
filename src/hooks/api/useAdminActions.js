// src/hooks/api/useAdminActions.js
import { useMutation, useQueryClient } from 'react-query';
import { BooksAPI } from '../../api/apiClient';

export const useAddBook = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (data) => BooksAPI.addBook(data).then((res) => res.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('books'); // Kitoblar ro'yxatini yangilash
            },
        }
    );
};

export const useDeleteBook = () => {
    const queryClient = useQueryClient();
    return useMutation((id) => BooksAPI.deleteBook(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('books');
        },
    });
};

export const useBatchUpload = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (file) => BooksAPI.uploadMultipleBooks(file),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('books');
            },
        }
    );
};