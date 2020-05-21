import React from "react"
import { Typography, Statistic } from 'antd';

const { Paragraph } = Typography;

const OrderHistoryItem = ({ orderHistory }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', width: "100%" }}>
            <div>
                <img src={orderHistory.imageUrl} style={{ width: '60px', height: 'auto', borderRadius: '2px' }} alt="本のカバー"></img>
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