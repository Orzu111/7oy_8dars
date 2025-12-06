// src/pages/Auth/Login.jsx
import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, message } from 'antd';
import { LockOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';
import { useAuthStore } from '../../store/authStore';
import { AuthAPI } from '../../api/apiClient';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const Login = () => {
    const navigate = useNavigate();
    const { login: setAuth } = useAuthStore();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await AuthAPI.login(values);
            setAuth(response.data.accessToken, response.data.user);
            message.success(t('login.success'));
            navigate('/home'); 
        } catch (error) {
            message.error(t('login.error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
            <Card
                className="w-full max-w-md p-4 shadow-2xl rounded-xl bg-white dark:bg-gray-800 transition-colors border-none"
                bordered={false}
            >
                <Title level={2} className="text-center mb-6 dark:text-white flex items-center justify-center">
                    <LoginOutlined className="mr-3 text-blue-500" />
                    {t('login.title')} 
                </Title>
                <Form
                    name="login-form"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    {}
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: t('login.usernameRequired') }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder={t('login.usernamePlaceholder')}
                            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </Form.Item>

                    {/* Password */}
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: t('login.passwordRequired') }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder={t('login.passwordPlaceholder')}
                            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </Form.Item>

                    <Form.Item className="mt-6">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            icon={<LoginOutlined />}
                            className="w-full bg-blue-600 hover:bg-blue-700 border-none h-10 text-lg transition-all duration-300"
                        >
                            {t('login.button')}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
