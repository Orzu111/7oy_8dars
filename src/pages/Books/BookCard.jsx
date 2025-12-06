import React from 'react';
import { Card, Typography, Tag, Button } from 'antd';
import { Link } from 'react-router-dom';
import { ReadOutlined } from '@ant-design/icons';
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
                        src={book.coverImageUrl || 'https://via.placeholder.com/300x400?text=No+Cover'}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    {!book.isAvailable && (
                        <div className="absolute top-2 right-2">
                            <Tag color="red">Band qilingan</Tag>
                        </div>
                    )}
                </div>
            }
        >
            <div className="flex flex-col h-full">
                <div className="mb-4">
                    <Title level={5} className="dark:text-white line-clamp-1" title={book.title}>
                        {book.title}
                    </Title>
                    <Text type="secondary" className="dark:text-gray-400 block mb-2">{book.author}</Text>
                    <Tag color="blue">{book.publishedDate?.split('-')[0] || '2024'}</Tag>
                </div>
                
                <Link to={`/books/${book.id}`} className="mt-auto">
                    <Button type="primary" block icon={<ReadOutlined />}>
                        {t('books.viewDetails') || 'Ko‘rish'}
                    </Button>
                </Link>
            </div>
        </Card>
    );
};

export default BookCard;
