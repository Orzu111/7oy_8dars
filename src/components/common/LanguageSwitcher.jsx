import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { GlobalOutlined } from '@ant-design/icons';

const { Option } = Select;

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (value) => {
        i18n.changeLanguage(value);
        localStorage.setItem('i18nextLng', value);
    };

    return (
        <Select
            defaultValue={i18n.language || 'uz'}
            onChange={changeLanguage}
            className="w-24 dark:bg-gray-700"
            suffixIcon={<GlobalOutlined className="dark:text-white" />}
            bordered={false}
        >
            <Option value="uz">O'zb</Option>
            <Option value="en">Eng</Option>
        </Select>
    );
};

export default LanguageSwitcher;