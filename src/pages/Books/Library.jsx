import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Typography, Empty } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const Library = () => {
    const { t } = useTranslation();

    return (
        <MainLayout>
             <div className="p-6 dark:bg-gray-900 min-h-screen text-center">
                <Title level={2} className="dark:text-white mb-10">{t('menu.myLibrary')}</Title>
                
                <Empty 
                    image={Empty.PRESENTED_IMAGE_SIMPLE} 
                    description={<span className="dark:text-gray-400">Hozircha kutubxonangiz bo'sh.</span>}
                />
                
                {/* Kelajakda bu yerda foydalanuvchi sotib olgan yoki saqlagan kitoblar chiqadi */}
             </div>
        </MainLayout>
    );
};

export default Library;