import React from "react"
import { Row, Col, Typography } from 'antd'
import OPEN_SHOP_IMG from 'images/sale-report.png'
import SimpleBorderedShadowButton from "components/button/simple-border-shadow";

const { Paragraph } = Typography;
const cardStyle = {
    background: '#FFFFFF',
    boxShadow: '6px 6px 12px #a3a5a8, -6px -6px 12px #ffffff',
    borderRadius: '1rem',
    width: '100%',
    height: '100%',
    padding: '20px',
    fontColor: 'black',
}

const SaleDashboard = ({ url }) => {
    return (
        <div style={{ maxWidth: '700px', margin: '80px auto', ...cardStyle }}>
            <Row>
                <Col xs={24} sm={18} md={18} lg={18} xl={18} style={{ textAlign: 'center' }}>
                    <Paragraph style={{ fontSize: '22px', color: 'black', marginBottom: '50px' }}>売上管理ページ</Paragraph>
                    {/* <Paragraph style={{ textAlign: 'left' }}>売上管理</Paragraph> */}
                    <a href={url} >
                        <SimpleBorderedShadowButton color="#1890ff" text="売上管理ページへ" />
                    </a>
                </Col>
                <Col xs={0} sm={6} md={6} lg={6} xl={6}>
                    <img src={OPEN_SHOP_IMG} style={{ width: '100%', height: 'auto' }} />
                </Col>
            </Row>
        </div>
    )
}

export default SaleDashboard