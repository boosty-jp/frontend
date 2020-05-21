import React from "react"
import { Row, Col, Typography } from 'antd';
import FrontendCategoryImage from "components/image/category/frontend";
import AICategoryImage from "components/image/category/ai";
import SecurityCategoryImage from "components/image/category/security";
import AppCategoryImage from "components/image/category/app";
import InfraCategoryImage from "components/image/category/infra";
import BackendCategoryImage from "components/image/category/backend";

const { Paragraph } = Typography;

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontColor: 'black',
    textAlign: 'center'
}

const categories = [
    {
        title: "フロントエンド", image: <FrontendCategoryImage style={{ margin: '0 auto' }} />
    },
    { title: "バックエンド", image: <BackendCategoryImage style={{ margin: '0 auto' }} /> },
    { title: "インフラ", image: <InfraCategoryImage style={{ margin: '0 auto' }} /> },
    { title: "アプリ開発", image: <AppCategoryImage style={{ margin: '0 auto' }} /> },
    { title: "セキュリティ", image: <SecurityCategoryImage style={{ margin: '0 auto' }} /> },
    { title: "機械学習", image: <AICategoryImage style={{ margin: '0 auto' }} /> },
]

const BookCategoryComponent = () => {
    return (
        <div style={{ backgroundColor: '#F7FAFF' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                <Paragraph style={{ color: 'black', textAlign: 'center' }}>対応カテゴリ</Paragraph>
            </div>
            <Row gutter={32}>
                {categories.map(category => {
                    return (
                        <Col xs={24} sm={12} md={8} lg={8} xl={8} key={category.title} style={{ marginBottom: '32px' }}>
                            <div style={cardStyle} >
                                {category.image}
                                <Paragraph style={{ fontSize: '18px', fontWeight: "500", marginTop: '20px', color: 'black' }}>{category.title}</Paragraph>
                            </div>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}
export default BookCategoryComponent