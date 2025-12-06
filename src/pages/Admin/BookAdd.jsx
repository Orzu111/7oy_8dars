// src/pages/Admin/BookAdd.jsx
import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Upload, Card, Typography, Row, Col, Space, message, Select } from 'antd';
import { UploadOutlined, SaveOutlined, BookOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAddBook } from '../../hooks/api/useAdminActions'; // useMutation hook
import MainLayout from '../../layouts/MainLayout';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// Fayl yuklashdan oldin validatsiya
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('Siz faqat JPG/PNG fayllarni yuklashingiz mumkin!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Rasm hajmi 2MB dan kichik bo‘lishi kerak!');
    }
    return isJpgOrPng && isLt2M ? true : Upload.LIST_IGNORE; // Noto'g'ri faylni yuklashni to'xtatadi
};

const BookAdd = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const addBookMutation = useAddBook();

    const onFinish = (values) => {
        const coverImageFile = fileList.length > 0 ? fileList[0].originFileObj : null;
        
        // APIga yuboriladigan ma'lumotlar
        const payload = {
            ...values,
            coverImageFile, // Bu yerda fayl, alohida rasm yuklash funksiyasi orqali ishlatilishi kerak.
            // Oddiy demo uchun hozircha rasm yuklash URL'ni API client orqali bajaramiz.
        };

        addBookMutation.mutate(payload, {
            onSuccess: () => {
                message.success(t('admin.addBookSuccess'));
                form.resetFields();
                setFileList([]);
                // Foydalanuvchini Home sahifaga yo'naltirish mumkin
            },
            onError: (error) => {
                message.error(`${t('admin.addBookError')}: ${error.response?.data?.message || 'Server xatosi'}`);
            },
        });
    };

    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList.slice(-1)); // Faqat oxirgi yuklangan faylni qabul qilish
    };

    return (
        <MainLayout>
            <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
                <Title level={2} className="dark:text-white mb-6 border-b pb-3 flex items-center">
                    <BookOutlined className="mr-3 text-blue-500" /> 
                    {t('admin.titleAddSingleBook')}
                </Title>

                <Card className="shadow-2xl dark:bg-gray-800 border-none">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{ pageCount: 100 }}
                        className="dark:text-white"
                    >
                        <Row gutter={24}>
                            {/* Chap Ustun: Asosiy Ma'lumotlar */}
                            <Col xs={24} lg={16}>
                                <Form.Item
                                    label={t('book.title')}
                                    name="title"
                                    rules={[{ required: true, message: t('book.titleRequired') }]}
                                >
                                    <Input placeholder={t('book.titlePlaceholder')} className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                </Form.Item>

                                <Form.Item
                                    label={t('book.author')}
                                    name="author"
                                    rules={[{ required: true, message: t('book.authorRequired') }]}
                                >
                                    <Input placeholder={t('book.authorPlaceholder')} className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                </Form.Item>

                                <Form.Item
                                    label={t('book.description')}
                                    name="description"
                                    rules={[{ required: true, message: t('book.descriptionRequired') }]}
                                >
                                    <TextArea rows={4} placeholder={t('book.descriptionPlaceholder')} className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                </Form.Item>
                            </Col>

                            {/* O'ng Ustun: Qoshimcha Ma'lumotlar va Rasm */}
                            <Col xs={24} lg={8}>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label={t('book.isbn')}
                                            name="isbn"
                                            rules={[{ required: true, message: t('book.isbnRequired') }]}
                                        >
                                            <Input placeholder="978-0123456789" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label={t('book.pageCount')}
                                            name="pageCount"
                                            rules={[{ required: true, message: t('book.pageCountRequired') }]}
                                        >
                                            <InputNumber min={1} className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                
                                {/* Rasm yuklash (Professional UI) */}
                                <Form.Item
                                    label={t('book.coverImage')}
                                    name="coverImage"
                                    valuePropName="fileList"
                                    getValueFromEvent={handleUploadChange}
                                    className="mt-4"
                                >
                                    <Upload
                                        name="coverImage"
                                        listType="picture"
                                        maxCount={1}
                                        beforeUpload={beforeUpload}
                                        onChange={handleUploadChange}
                                        fileList={fileList}
                                        // Faylni o'zimiz POST so'rovda yuborganimiz sababli, AntDning o'zini yuklashini bekor qilamiz.
                                        customRequest={({ file, onSuccess }) => { 
                                            setTimeout(() => {
                                                onSuccess('ok');
                                            }, 0);
                                        }}
                                        className="dark:text-white"
                                    >
                                        <Button icon={<UploadOutlined />} className="dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white dark:border-blue-600">
                                            {t('book.uploadImageText')}
                                        </Button>
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Saqlash Tugmasi */}
                        <Form.Item className="mt-8">
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                size="large"
                                loading={addBookMutation.isLoading}
                                icon={<SaveOutlined />}
                                className="w-full bg-green-600 hover:bg-green-700 border-none transition-all duration-300"
                            >
                                {t('admin.saveBook')}
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </MainLayout>
    );
};

export default BookAdd;