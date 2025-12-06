import React, { useState } from 'react';
import { useBooks } from '../../hooks/api/useBooks'; // Kitoblarni yuklash hook'i
import BookSkeleton from '../../components/common/BookSkeleton';
import BookCard from '../../components/books/BookCard'; // ✅
import { Row, Col, Pagination, Input, Select, Empty, Typography, Card, Space } from 'antd';
import MainLayout from '../../layouts/MainLayout';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;

const BooksList = () => {
    const { t } = useTranslation();
    
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(12); // Bir sahifada 12 ta kitob ko'rsatiladi
    const [sortBy, setSortBy] = useState('publishedDate:desc'); // Eng yangisi birinchi

    // React Query hook orqali ma'lumotlarni yuklash
    const { data, isLoading, isError, isFetching } = useBooks({ page, limit, search, sortBy });

    const handleSearch = (value) => {
        setSearch(value);
        setPage(1); // Qidiruvdan so'ng 1-sahifaga qaytarish
    };
    
    const books = data?.data || [];
    const total = data?.total || 0;

    // --- Loading Holati ---
    if (isLoading) {
        return <MainLayout><BookSkeleton /></MainLayout>;
    }

    // --- Xatolik Holati ---
    if (isError) {
        return (
            <MainLayout>
                <div className="text-center p-8 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 m-6 rounded-lg">
                    {t('books.fetchError') || "Kitoblarni yuklashda xatolik yuz berdi. Iltimos, API ulanishini tekshiring."}
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="p-6 dark:bg-gray-900 min-h-screen transition-colors">
                <Title level={1} className="dark:text-white mb-6 border-b pb-3 flex items-center">
                    {t('menu.allBooks') || 'Barcha Kitoblar'} ({total})
                </Title>
                
                {/* Qidiruv va Filtrlash Paneli */}
                <Card className={`shadow-lg mb-6 dark:bg-gray-800 border-none ${isFetching ? 'opacity-70' : ''}`}>
                    <Space wrap size="large" className="w-full justify-between">
                        <Search
                            placeholder={t('books.searchPlaceholder') || "Nom yoki muallif bo'yicha qidirish..."}
                            onSearch={handleSearch}
                            enterButton={<SearchOutlined />}
                            className="w-full sm:max-w-xs dark:bg-gray-700"
                            size="large"
                            loading={isFetching}
                        />

                        <Select 
                            defaultValue={sortBy} 
                            onChange={setSortBy} 
                            className="w-full sm:w-48 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            size="large"
                            suffixIcon={<FilterOutlined className="dark:text-white" />}
                        >
                            <Option value="title:asc">{t('books.sortTitleAsc') || 'Nom A-Z'}</Option>
                            <Option value="author:asc">{t('books.sortAuthorAsc') || 'Muallif A-Z'}</Option>
                            <Option value="publishedDate:desc">{t('books.sortNewest') || 'Eng yangilari'}</Option>
                        </Select>
                    </Space>
                </Card>

                {/* Kitoblar Ro'yxati */}
                {books.length > 0 ? (
                    <Row gutter={[24, 24]} className={isFetching ? 'opacity-50 transition-opacity' : ''}>
                        {books.map((book) => (
                            <Col key={book.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                                {/* Har bir kitobni BookCard orqali chizish */}
                                <BookCard book={book} />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Empty description={t('books.noResults') || "Kriteriyalaringizga mos kitob topilmadi."} className="mt-10 dark:text-gray-400" />
                )}

                {/* Pagination */}
                {total > 0 && (
                    <div className="mt-8 text-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-inner">
                        <Pagination
                            current={page}
                            pageSize={limit}
                            total={total}
                            onChange={(p, size) => { setPage(p); setLimit(size); }}
                            showSizeChanger
                            pageSizeOptions={['12', '24', '48']}
                            className="dark:text-white"
                        />
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default BooksList;