import React from 'react';
import { Card, Typography, Row, Col, Statistic, Button } from 'antd';
import { ReadOutlined, TeamOutlined, PlusCircleOutlined, SettingOutlined } from '@ant-design/icons';
import MainLayout from '/src/layouts/MainLayout';
import { useAuthStore } from '/src/store/authStore';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const Home = () => {
    const { t } = useTranslation();
    const { user, isAdmin } = useAuthStore();

    return (
        <MainLayout>
            <div className="p-6 dark:bg-gray-900 min-h-screen transition-colors">
                <Title level={1} className="dark:text-white mb-6">
                    {t('home.welcome')} <Text strong className="text-blue-600 dark:text-blue-400">{user?.username}</Text>!
                </Title>

                <Row gutter={[24, 24]} className="mb-8">
                    {/* Statistikalar */}
                    <Col xs={24} sm={12} lg={8}>
                        <Card className="shadow-lg dark:bg-gray-800 border-none">
                            <Statistic
                                title={t('home.totalBooks')}
                                value={100} 
                                prefix={<ReadOutlined className="text-blue-500" />}
                                className="dark:text-white"
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Card className="shadow-lg dark:bg-gray-800 border-none">
                            <Statistic
                                title={t('home.usersCount')}
                                value={240} 
                                prefix={<TeamOutlined className="text-green-500" />}
                                className="dark:text-white"
                            />
                        </Card>
                    </Col>
                    {isAdmin && (
                        <Col xs={24} sm={12} lg={8}>
                            <Card className="shadow-lg dark:bg-gray-800 border-none">
                                <Statistic
                                    title={t('home.adminStatus')}
                                    value={t('home.active')} 
                                    prefix={<SettingOutlined className="text-purple-500" />}
                                    className="dark:text-white"
                                />
                            </Card>
                        </Col>
                    )}
                </Row>
                
                {/* Tezkor Harakatlar */}
                {isAdmin && (
                    <Card 
                        title={<Title level={3} className="dark:text-white !m-0">{t('home.quickActions')}</Title>}
                        className="shadow-xl dark:bg-gray-800 border-none mt-6"
                    >
                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={12}>
                                <Link to="/admin/book/add">
                                    <Button type="primary" size="large" icon={<PlusCircleOutlined />} className="w-full bg-blue-600 hover:bg-blue-700">
                                        {t('menu.addSingleBook')}
                                    </Button>
                                </Link>
                            </Col>
                            <Col xs={24} md={12}>
                                <Link to="/admin/book/upload-batch">
                                    <Button type="default" size="large" icon={<SettingOutlined />} className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600">
                                        {t('menu.batchUpload')}
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Card>
                )}
            </div>
        </MainLayout>
    );
};

export default Home;
