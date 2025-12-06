import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookDetails } from '../../hooks/api/useBooks';
import { BooksAPI } from '../../api/apiClient';
import { useMutation, useQueryClient } from 'react-query';
import MainLayout from '../../layouts/MainLayout';
import { Form, Input, InputNumber, Button, message, Card, Spin, Typography } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const BookEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const queryClient = useQueryClient();

    const { data: book, isLoading } = useBookDetails(id);

    const updateMutation = useMutation(
        (data) => BooksAPI.updateBook(id, data),
        {
            onSuccess: () => {
                message.success('Kitob yangilandi!');
                queryClient.invalidateQueries(['book', id]);
                queryClient.invalidateQueries('books');
                navigate(`/books/${id}`);
            },
            onError: () => message.error('Xatolik yuz berdi'),
        }
    );

    useEffect(() => {
        if (book) form.setFieldsValue(book);
    }, [book, form]);

    const onFinish = (values) => updateMutation.mutate(values);

    if (isLoading) return <MainLayout><Spin className="flex justify-center mt-20" /></MainLayout>;

    return (
        <MainLayout>
            <div className="p-6 dark:bg-gray-900 min-h-screen">
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} className="mb-4">Orqaga</Button>
                
                <Card className="max-w-3xl mx-auto shadow-xl dark:bg-gray-800 border-none">
                     <Title level={2} className="dark:text-white mb-6">Kitobni Tahrirlash</Title>
                     
                     <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item name="title" label="Nomi" rules={[{ required: true }]}>
                            <Input className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                        </Form.Item>
                        
                        <Form.Item name="author" label="Muallif" rules={[{ required: true }]}>
                            <Input className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                        </Form.Item>

                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item name="isbn" label="ISBN">
                                <Input className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                            </Form.Item>
                            <Form.Item name="pageCount" label="Sahifalar">
                                <InputNumber className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                            </Form.Item>
                        </div>

                        <Form.Item name="description" label="Tavsif">
                            <Input.TextArea rows={4} className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                        </Form.Item>

                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            loading={updateMutation.isLoading}
                            icon={<SaveOutlined />}
                            className="w-full bg-blue-600 h-10"
                        >
                            Saqlash
                        </Button>
                     </Form>
                </Card>
            </div>
        </MainLayout>
    );
};

export default BookEdit;
