import React from "react"
import { Typography, Statistic } from 'antd';
import BookCoverImage from "components/image/cover";

const { Paragraph } = Typography;

const OrderHistoryItem = ({ orderHistory }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', width: "100%" }}>
            <div>
                <BookCoverImage imageUrl={orderHistory.imageUrl} boxShadow="2px 2px 4px #cdd0d4, -2px -2px 4px #ffffff" borderRadius="2px" />
            </div>
            <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', paddingLeft: '12px' }}>
                    <div>
                        <Paragraph style={{ fontSize: '18px', color: 'black' }}>{orderHistory.title}</Paragraph>
                        <Paragraph>注文日時: {orderHistory.purchaseDate}</Paragraph>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <Statistic value={orderHistory.price} suffix="円" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderHistoryItem