import React from "react"
import { Typography, Row, Col } from 'antd';
import BookCoverImage from "components/image/cover";
import { HeartOutlined } from "@ant-design/icons";
const { Paragraph } = Typography;

const SaleBookItem = ({ imageUrl, title, author, price, likedCount, fontSize = "12px" }) => {
    return (
        <div>
            <BookCoverImage imageUrl={imageUrl} boxShadow="2px 2px 4px #cdd0d4, -2px -2px 4px #ffffff" borderRadius="0.5rem" />
            <div style={{ margin: '10px 0px 0px 0px', textAlign: 'left' }}>
                <Paragraph ellipsis={{ rows: 1 }} style={{ color: 'black', fontSize: fontSize, marginBottom: '4px', }}>
                    {title}
                </Paragraph>
                <Paragraph ellipsis style={{ marginBottom: '4px', fontSize: fontSize }}>
                    {author.name}
                </Paragraph>
                <Row style={{ fontSize: fontSize }}>
                    <Col span={12} style={{ color: '#8c8c8c' }}>
                        <HeartOutlined style={{ marginRight: '2px' }} />
                        {likedCount}
                    </Col>
                    <Col span={12} style={{ textAlign: 'right', color: "#ff7875", fontWeight: "500" }}>
                        {price.toLocaleString()}円
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default SaleBookItem