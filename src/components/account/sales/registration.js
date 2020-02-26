import React from "react"
import { Row, Col, Typography } from 'antd'
import OPEN_SHOP_IMG from 'images/sale-report.png'
import SimpleBorderedShadowButton from "components/button/simple-border-shadow";
import { createStripeRegistrationLink } from "utils/link-generator";

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

const SaleRegistration = () => {
    return (
        <div style={{ maxWidth: '700px', margin: '80px auto', ...cardStyle }}>
            <Row>
                <Col xs={24} sm={18} md={18} lg={18} xl={18} style={{ textAlign: 'center' }}>
                    <Paragraph style={{ fontSize: '22px', color: 'black' }}>振り込み先の登録</Paragraph>
                    <Paragraph style={{ textAlign: 'left' }}>有料コンテンツを販売するには、売上を振り込むための情報を事前に登録する必要があります。下記のボタンより登録をお願いいたします。</Paragraph>
                    <a href={createStripeRegistrationLink()} >
                        <SimpleBorderedShadowButton color="#1890ff" text="登録ページへ" />
                    </a>
                </Col>
                <Col xs={0} sm={6} md={6} lg={6} xl={6}>
                    <img src={OPEN_SHOP_IMG} style={{ width: '100%', height: 'auto' }} />
                </Col>
            </Row>
        </div>
    )
}

export default SaleRegistration