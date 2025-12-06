import React, { useState } from 'react';
import { Row, Col, Pagination, Input, Select, Empty, Typography } from 'antd';
import {MainLayout} from '../../layouts/MainLayout'; // relative yo‘l tuzatildi
import BookCard from '../../components/books/BookCard';
import { useBooks } from '../../hooks/api/useBooks';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;

const BooksList = () => {
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(24); 
    const [sortBy, setSortBy] = useState('publishedDate:desc');

    const { data, isLoading, isError } = useBooks({ page, limit, search, sortBy });
    const books = data?.data || [];
    const total = data?.total || 0;

    const handleSearch = (value) => {
        setSearch(value);
        setPage(1); 
    };
const detail = useNavigate()
    return (
        <MainLayout>
            <div className="p-6 dark:bg-gray-900 min-h-screen">
                <Title level={1} className="dark:text-white mb-6 border-b pb-3">{t('menu.allBooks')}</Title>

                <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                    <Search
                        placeholder={t('books.searchPlaceholder')}
                        onSearch={handleSearch}
                        enterButton={<SearchOutlined />}
                        className="w-full sm:max-w-xs dark:bg-gray-700"
                        size="large"
                    />
                    <Select 
                        defaultValue={sortBy} 
                        onChange={setSortBy} 
                        className="w-full sm:w-48 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        size="large"
                        suffixIcon={<FilterOutlined className="dark:text-white" />}
                    >
                        <Option value="title:asc">{t('books.sortTitleAsc')}</Option>
                        <Option value="author:asc">{t('books.sortAuthorAsc')}</Option>
                        <Option value="publishedDate:desc">{t('books.sortNewest')}</Option>
                    </Select>
                </div>

                {books.length > 0 ? (
                    <Row gutter={[24, 24]}>
                        {books.map((book) => (
                            <Col key={book.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                                <BookCard book={book} />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Empty description={t('books.noResults')} className="mt-10 dark:text-gray-400" />
                )}

                {total > limit && (
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
