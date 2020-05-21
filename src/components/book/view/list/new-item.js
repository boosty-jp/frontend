import React from "react"
import { Typography, Statistic } from 'antd';
import BookCoverImage from "components/image/cover";
const { Paragraph } = Typography;

const SaleBookItem = ({ imageUrl, title, price }) => {
    return (
        <div >
            <BookCoverImage imageUrl={imageUrl} boxShadow="2px 2px 4px #cdd0d4, -2px -2px 4px #ffffff" borderRadius="0.5rem" />
            <div style={{ margin: '10px 12px 0px 12px', textAlign: 'left' }}>
                <Paragraph ellipsis={{ rows: 2 }} style={{ color: 'black', fontSize: '14px', marginBottom: '4px', }}>
                    {title}
                </Paragraph>
                <Statistic value={price} suffix="円" valueStyle={{ fontSize: '14px' }} />
            </div>
        </div>
    )
}

export default SaleBookItem