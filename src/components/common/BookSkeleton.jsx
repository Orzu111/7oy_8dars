// src/components/common/BookSkeleton.jsx
import React from 'react';
import { Skeleton, Card, Row, Col } from 'antd';

// Barcha sahifalarga mos keladigan moslashuvchan Skeleton
const BookSkeleton = () => {
    const skeletonItems = Array.from({ length: 12 }, (_, index) => index);

    return (
        <Row gutter={[16, 16]} className="p-4">
            {skeletonItems.map((index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Card className="shadow-lg dark:bg-gray-800 h-full border-none" bordered={false}>
                        <div className="h-48 mb-3 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700">
                            <Skeleton.Image active className="!w-full !h-full" />
                        </div>
                        <Skeleton 
                            active 
                            title={false} 
                            paragraph={{ rows: 3, width: ['100%', '75%', '50%'] }} 
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default BookSkeleton;