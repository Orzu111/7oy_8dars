// src/pages/Admin/BookUploadMultiple.jsx
import React, { useState } from 'react';
import { Upload, Button, Card, Typography, message, Progress, Divider, Alert, Space } from 'antd';
import { UploadOutlined, FileExcelOutlined, CloudUploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import MainLayout from '../../layouts/MainLayout';
import { BooksAPI } from '../../api/apiClient';

const { Title, Paragraph, Text } = Typography;

const BookUploadMultiple = () => {
    const { t } = useTranslation();
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleUpload = async () => {
        if (fileList.length === 0) {
            message.warning(t('admin.noFileSelected'));
            return;
        }

        const file = fileList[0];
        setUploading(true);
        setUploadProgress(0);

        try {
            // API ga so'rov yuborish
            await BooksAPI.uploadMultipleBooks(file, {
                // Bu yerda so'rov progressini kuzatish uchun maxsus Ant Design/Axios konfiguratsiyasi kerak
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                },
            });
            
            message.success(t('admin.batchUploadSuccess', { count: 100 }));
            setFileList([]);
        } catch (error) {
            message.error(`${t('admin.batchUploadError')}: ${error.response?.data?.message || 'Server xatosi'}`);
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            const isCSV = file.name.endsWith('.csv');
            if (!isCSV) {
                message.error('Faqat CSV fayllarini yuklash mumkin!');
            }
            // Faylni darhol yuklamaslik uchun false qaytaramiz, biz o'zimiz handleUpload orqali yuklaymiz
            setFileList([file]);
            return false;
        },
        fileList,
        maxCount: 1,
        accept: '.csv', // Faqat CSV fayllarini qabul qilish
    };

    return (
        <MainLayout>
            <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
                <Title level={2} className="dark:text-white mb-6 border-b pb-3 flex items-center">
                    <CloudUploadOutlined className="mr-3 text-purple-500" />
                    {t('admin.titleBatchUpload')}
                </Title>

                <Card className="shadow-2xl dark:bg-gray-800 border-none">
                    <Alert
                        message={t('admin.uploadInfoTitle')}
                        description={
                            <Paragraph className="dark:text-gray-300">
                                {t('admin.uploadInfoDesc')}
                                <ul className="list-disc list-inside mt-2 ml-4">
                                    <li><Text strong>Columns:</Text> <Text code>title, author, isbn, description, pageCount, publishedDate</Text></li>
                                    <li><Text strong>Format:</Text> <Text code>CSV</Text> fayl bo'lishi kerak.</li>
                                </ul>
                            </Paragraph>
                        }
                        type="info"
                        showIcon
                        className="mb-6 bg-blue-100 dark:bg-blue-900 dark:border-blue-700"
                    />

                    <Space size="large" className="mb-6">
                         <Button 
                            icon={<DownloadOutlined />} 
                            href="/path/to/sample_template.csv" // Shablon fayl yo'li
                            target="_blank"
                            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        >
                            {t('admin.downloadTemplate')}
                        </Button>
                    </Space>
                    
                    <Divider className="dark:border-gray-700" />

                    <Upload.Dragger {...props} disabled={uploading} className="dark:bg-gray-700 dark:border-dashed dark:border-gray-600">
                        <p className="ant-upload-drag-icon">
                            <FileExcelOutlined className="text-6xl text-purple-500" />
                        </p>
                        <p className="ant-upload-text dark:text-white">{t('admin.uploadAreaTitle')}</p>
                        <p className="ant-upload-hint dark:text-gray-400">
                            {t('admin.uploadAreaHint')}
                        </p>
                    </Upload.Dragger>

                    {uploading && (
                        <div className="mt-6">
                            <Text className="dark:text-white">{t('admin.uploading')}</Text>
                            <Progress percent={uploadProgress} status={uploadProgress === 100 ? 'success' : 'active'} className="mt-2" />
                        </div>
                    )}
                    
                    <Button
                        type="primary"
                        onClick={handleUpload}
                        disabled={fileList.length === 0 || uploading}
                        loading={uploading}
                        icon={<CloudUploadOutlined />}
                        size="large"
                        className="w-full mt-6 bg-purple-600 hover:bg-purple-700 border-none transition-all duration-300"
                    >
                        {uploading ? t('admin.uploading') : t('admin.startUpload')}
                    </Button>
                </Card>
            </div>
        </MainLayout>
    );
};

export default BookUploadMultiple;