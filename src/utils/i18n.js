// src/utils/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "app.name": "BookManager Pro",
      "app.footerText": "© 2024 BookManager Pro. All rights reserved.",
      "menu.home": "Home",
      "menu.allBooks": "All Books (100)",
      "menu.myLibrary": "My Library",
      "menu.adminAdd": "Admin Tools",
      "menu.addSingleBook": "Add Single Book",
      "menu.batchUpload": "Batch Upload",

      "login.title": "Sign In to Admin Panel",
      "login.button": "Login",
      "login.usernamePlaceholder": "Username",
      "login.passwordPlaceholder": "Password",
      "login.success": "Login successful!",
      "login.error": "Login failed. Check your credentials.",

      "books.searchPlaceholder": "Search by title or author...",
      "books.sortTitleAsc": "Title A-Z",
      "books.sortNewest": "Newest First",
      "books.by": "by",
      "books.noResults": "No books found matching your criteria.",
      "books.fetchError": "Error loading books. Please try again.",

      "admin.titleAddSingleBook": "Add New Book",
      "admin.saveBook": "Save Book",
      "admin.addBookSuccess": "Book added successfully!",
      // ... boshqa tarjimalar
    }
  },
  uz: {
    translation: {
      "app.name": "Kitoblar Menejeri Pro",
      "app.footerText": "© 2024 Kitoblar Menejeri Pro. Barcha huquqlar himoyalangan.",
      "menu.home": "Bosh Sahifa",
      "menu.allBooks": "Barcha Kitoblar (100)",
      "menu.myLibrary": "Mening Kutubxonam",
      "menu.adminAdd": "Admin Asboblari",
      "menu.addSingleBook": "Yagona Kitob Qo'shish",
      "menu.batchUpload": "Ommaviy Yuklash",

      "login.title": "Admin Paneliga Kirish",
      "login.button": "Kirish",
      "login.usernamePlaceholder": "Foydalanuvchi nomi",
      "login.passwordPlaceholder": "Parol",
      "login.success": "Muvaffaqiyatli kirdingiz!",
      "login.error": "Kirishda xatolik. Ma'lumotlaringizni tekshiring.",

      "books.searchPlaceholder": "Nom yoki muallif bo'yicha qidirish...",
      "books.sortTitleAsc": "Nom A-Z",
      "books.sortNewest": "Eng yangilari",
      "books.by": "muallif",
      "books.noResults": "Kriteriyalaringizga mos kitob topilmadi.",
      "books.fetchError": "Kitoblarni yuklashda xatolik yuz berdi. Qaytadan urinib ko'ring.",
      
      "admin.titleAddSingleBook": "Yangi Kitob Qo'shish",
      "admin.saveBook": "Kitobni Saqlash",
      "admin.addBookSuccess": "Kitob muvaffaqiyatli qo'shildi!",
      // ... boshqa tarjimalar
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "uz", // Boshlang'ich til
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;