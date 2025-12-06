import { useQuery } from 'react-query';
import { BooksAPI } from '../../api/apiClient';

/**
 * 100 ta kitoblar ro'yxatini olish uchun Hook
 * * @param {Object} params - Qidiruv va sahifalash parametrlari
 * @param {number} params.page - Hozirgi sahifa raqami
 * @param {number} params.limit - Bir sahifadagi kitoblar soni
 * @param {string} [params.search] - Qidiruv so'zi (ixtiyoriy)
 * @param {string} [params.sortBy] - Saralash turi (ixtiyoriy)
 */
export const useBooks = (params) => {
    return useQuery(
        // Query Key: Bu array o'zgarganda (masalan, page o'zgarsa) so'rov qayta yuboriladi
        ['books', params], 
        
        // Fetcher Function: API dan ma'lumot olish
        () => BooksAPI.getBooks(params).then((res) => res.data),
        
        // Options
        {
            keepPreviousData: true, // Sahifa o'zgarayotganda eski ma'lumotni ushlab turadi (UX uchun muhim)
            staleTime: 5000, // 5 soniya davomida ma'lumotni "yangi" deb hisoblaydi va qayta so'rov yubormaydi
            retry: 1, // Xatolik bo'lsa 1 marta qayta urinib ko'radi
        }
    );
};

/**
 * Bitta kitobning to'liq ma'lumotlarini olish uchun Hook
 * * @param {number|string} bookId - Kitob ID si
 */
export const useBookDetails = (bookId) => {
    return useQuery(
        ['book', bookId],
        () => BooksAPI.getBookById(bookId).then((res) => res.data),
        {
            enabled: !!bookId, // Agar bookId yo'q bo'lsa, so'rov yuborilmaydi (xatolikni oldini oladi)
            staleTime: 1000 * 60 * 5, // 5 daqiqa davomida keshda saqlaydi
        }
    );
};