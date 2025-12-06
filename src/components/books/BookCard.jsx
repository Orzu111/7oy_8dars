import React from 'react';
import { Card, Typography, Tag, Button } from 'antd';
import { Link } from 'react-router-dom';
import { ReadOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const BookCard = ({ book }) => {
    const { t } = useTranslation();

    return (
        <Card
            hoverable
            className="h-full flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 dark:bg-gray-800 dark:border-gray-700 overflow-hidden group"
            
            cover={
                <div className="h-56 overflow-hidden relative">
                    <img
                        alt={book.title}
                        // API'dan kelgan rasm URL'si yoki placeholder
                        src={book.coverImageUrl || 'https://via.placeholder.com/300x400?text=No+Cover'} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Mavjudlik belgisi (agar kerak bo'lsa) */}
                    {!book.isAvailable && (
                        <div className="absolute top-2 right-2">
                            <Tag color="red">{t('book.reserved') || 'Band qilingan'}</Tag>
                        </div>
                    )}
                </div>
            }
        >
            <div className="flex flex-col h-full">
                <div className="mb-4">
                    {/* Nom (Qisqa qilib ko'rsatish) */}
                    <Title level={5} className="dark:text-white line-clamp-1" title={book.title}>
                        {book.title}
                    </Title>
                    
                    {/* Muallif */}
                    <Text type="secondary" className="dark:text-gray-400 block mb-2">
                        {book.author}
                    </Text>
                    
                    { }
                    <Tag color="blue">{book.publishedDate ? book.publishedDate.split('-')[0] : 'Yili yo‘q'}</Tag>
                </div>
                
                {/* Batafsil ko'rish tugmasi */}
                <Link to={`/books/${book.id}`} className="mt-auto">
                    <Button type="primary" block icon={<ReadOutlined />} className="bg-blue-600 hover:bg-blue-700 transition-colors">
                        {t('books.viewDetails') || 'Ko‘rish'}
                    </Button>
                </Link>
            </div>
        </Card>
    );
};

export default BookCard;