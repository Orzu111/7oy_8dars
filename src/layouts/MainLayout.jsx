// src/layouts/MainLayout.jsx
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Space, Typography, Tooltip } from 'antd';
import { HomeOutlined, BookOutlined, UserOutlined, SettingOutlined, MenuOutlined, LogoutOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import LanguageSwitcher from "../components/common/LanguageSwitcher";
import { useTranslation } from 'react-i18next';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const MainLayout = ({ children }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const { user, isAdmin, logout } = useAuthStore();
    const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const menuItems = [
        { key: '/home', icon: <HomeOutlined />, label: t('menu.home') },
        { key: '/books', icon: <BookOutlined />, label: t('menu.allBooks') },
        { key: '/library', icon: <BookOutlined />, label: t('menu.myLibrary') },
        ...(isAdmin ? [
            {
                key: '/admin/add', icon: <SettingOutlined />, label: t('menu.adminAdd'), children: [
                    { key: '/admin/book/add', label: t('menu.addSingleBook') },
                    { key: '/admin/book/upload-batch', label: t('menu.batchUpload') },
                ]
            },
        ] : []),
    ];

    return (
        <Layout className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
            <Header className="flex items-center justify-between px-4 sm:px-8 bg-white dark:bg-gray-900 border-b dark:border-gray-700 h-16 shadow-md transition-colors">
                <Link to="/" className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                    {t('app.name')}
                </Link>

                <Menu
                    theme={darkMode ? 'dark' : 'light'}
                    mode="horizontal"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    className="flex-1 justify-center hidden md:flex dark:bg-gray-900 dark:text-white"
                />

                <Space size="middle" className="flex items-center">
                    <Tooltip title={darkMode ? t('theme.light') : t('theme.dark')}>
                        <Button
                            icon={darkMode ? <SunOutlined /> : <MoonOutlined />}
                            onClick={toggleDarkMode}
                            className="dark:bg-gray-700 dark:text-yellow-400 dark:border-gray-600 border-none"
                        />
                    </Tooltip>

                    <LanguageSwitcher />

                    {user && (
                        <Space className="hidden sm:flex">
                            <Text className="dark:text-white">
                                {t('user.welcome')},{' '}
                                <Text strong className="text-blue-600 dark:text-blue-400">
                                    {user.username}
                                </Text>
                            </Text>

                            <Button icon={<LogoutOutlined />} onClick={logout} danger>
                                {t('auth.logout')}
                            </Button>
                        </Space>
                    )}

                    <Button
                        className="md:hidden dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        icon={<MenuOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                    />
                </Space>
            </Header>

            {collapsed && (
                <div className="absolute top-16 left-0 w-full z-10 bg-white dark:bg-gray-800 shadow-xl md:hidden">
                    <Menu
                        theme={darkMode ? 'dark' : 'light'}
                        mode="inline"
                        selectedKeys={[location.pathname]}
                        items={menuItems}
                        onClick={() => setCollapsed(false)}
                    />
                    <div className="p-4 border-t dark:border-gray-700">
                        {user ? (
                            <Space direction="vertical" className="w-full">
                                <Text className="dark:text-white">
                                    {t('user.welcome')}, {user.username}
                                </Text>
                                <Button icon={<LogoutOutlined />} onClick={logout} danger block>
                                    {t('auth.logout')}
                                </Button>
                            </Space>
                        ) : (
                            <Button type="primary" block>Login</Button>
                        )}
                    </div>
                </div>
            )}

            <Content className="p-0 sm:p-4 bg-gray-50 dark:bg-gray-900 transition-colors">
                {children}
            </Content>

            <Footer className="text-center bg-white dark:bg-gray-900 dark:text-gray-400 border-t dark:border-gray-800">
                {t('app.footerText')}
            </Footer>
        </Layout>
    );
};

// ⚠️ Shuni qo‘shdim — endi { MainLayout } bilan import qilsang ham ishlaydi
export default MainLayout;
export { MainLayout };
