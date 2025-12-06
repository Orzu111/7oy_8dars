// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './utils/i18n'; // i18next konfiguratsiyasi
import { ConfigProvider } from 'antd';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // UX uchun
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* Ant Design Theme Provider - Dark Mode stilini osonroq boshqarish uchun */}
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#2563EB', // Blue-600
              borderRadius: 6,
            },
            components: {
              // Komponentlarga maxsus stillar qo'shish mumkin
            }
          }}
        >
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);