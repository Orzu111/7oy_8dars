import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBookDetails } from '../../hooks/api/useBooks'; // relative yo‘l
import { useDeleteBook } from '../../hooks/api/useAdminActions'; // relative yo‘l
import {MainLayout} from '../../layouts/MainLayout'; // relative yo‘l
import { Card, Row, Col, Typography, Button, Tag, Spin, Modal, message, Descriptions } from 'antd';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;
const { confirm } = Modal;

const BookDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { isAdmin } = useAuthStore();

    const { data: book, isLoading, isError } = useBookDetails(id);
    const deleteBookMutation = useDeleteBook();

    const handleDelete = () => {
        confirm({
            title: t('admin.confirmDeleteTitle') || 'O‘chirishni tasdiqlaysizmi?',
            content: t('admin.confirmDeleteContent') || 'Bu amalni ortga qaytarib bo‘lmaydi.',
            okText: 'Ha, o‘chirish',
            okType: 'danger',
            cancelText: 'Bekor qilish',
            onOk() {
                deleteBookMutation.mutate(id, {
                    onSuccess: () => { message.success('Kitob o‘chirildi'); navigate('/books'); },
                    onError: () => message.error('Xatolik yuz berdi'),
                });
            },
        });
    };

    if (isLoading) return <MainLayout><div className="flex justify-center items-center h-screen"><Spin size="large" /></div></MainLayout>;
    if (isError || !book) return <MainLayout><div className="text-center mt-10 text-red-500">Kitob topilmadi</div></MainLayout>;

    return (
        <MainLayout>
            <div className="p-6 dark:bg-gray-900 min-h-screen">
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} className="mb-6 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                    Orqaga
                </Button>

                <Card className="shadow-2xl dark:bg-gray-800 border-none">
                    <Row gutter={[32, 32]}>
                        <Col xs={24} md={8} lg={6}>
                            <div className="rounded-lg overflow-hidden shadow-lg">
                                <img src={book.coverImageUrl || 'https://via.placeholder.com/400x600?text=No+Cover'} alt={book.title} className="w-full h-auto object-cover"/>
                            </div>
                        </Col>
                        <Col xs={24} md={16} lg={18}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <Title level={2} className="dark:text-white mb-2">{book.title}</Title>
                                    <Title level={4} type="secondary" className="dark:text-gray-400 mt-0">{book.author}</Title>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    {book.isAvailable ? (
                                        <Tag icon={<CheckCircleOutlined />} color="success" className="text-lg py-1 px-3">Mavjud</Tag>
                                    ) : (
                                        <Tag icon={<CloseCircleOutlined />} color="error" className="text-lg py-1 px-3">Band</Tag>
                                    )}
                                </div>
                            </div>

                            <Descriptions bordered column={{ xxl:2, xl:2, lg:2, md:1, sm:1, xs:1 }} className="my-6 dark:bg-gray-700">
                                <Descriptions.Item label="ISBN">{book.isbn}</Descriptions.Item>
                                <Descriptions.Item label="Sahifalar">{book.pageCount}</Descriptions.Item>
                                <Descriptions.Item label="Nashr sanasi">{book.publishedDate}</Descriptions.Item>
                                <Descriptions.Item label="ID">#{book.id}</Descriptions.Item>
                            </Descriptions>

                            <Title level={5} className="dark:text-white">Tavsif:</Title>
                            <Paragraph className="dark:text-gray-300 text-lg leading-relaxed">{book.description}</Paragraph>

                            {isAdmin && (
                                <div className="mt-8 flex gap-4 pt-6 border-t dark:border-gray-700">
                                    <Link to={`/admin/book/edit/${book.id}`}>
                                        <Button type="primary" icon={<EditOutlined />} size="large" className="bg-orange-500 hover:bg-orange-600">Tahrirlash</Button>
                                    </Link>
                                    <Button danger icon={<DeleteOutlined />} size="large" onClick={handleDelete}>O‘chirish</Button>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Card>
            </div>
        </MainLayout>
    );
};

export default BookDetail;
