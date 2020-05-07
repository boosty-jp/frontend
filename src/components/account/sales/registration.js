import React from "react"
import { Row, Col, Typography, Button } from 'antd'
import OPEN_SHOP_IMG from 'images/sale-report.png'
import { createStripeRegistrationLink } from "utils/link-generator";

const { Paragraph } = Typography;

const SaleRegistration = () => {
    return (
        <Row style={{ marginTop: '120px' }} align="middle">
            <Col xs={0} sm={8} md={11} lg={11} xl={11}>
                <img src={OPEN_SHOP_IMG} style={{ width: '100%', height: 'auto' }} alt="振込先登録を促す画像" />
            </Col>
            <Col xs={24} sm={16} md={13} lg={13} xl={13}>
                <Paragraph style={{ fontSize: '26px', color: 'black', fontWeight: '500' }}>振り込み先の登録</Paragraph>
                <Paragraph >有料コンテンツを販売するには、売上を振り込むための情報を事前に登録する必要があります。下記のボタンより登録をお願いいたします。</Paragraph>
                <a href={createStripeRegistrationLink()} >
                    <Button type="primary" shape="round">登録ページへ</Button>
                </a>
            </Col>

        </Row>
    )
}

export default SaleRegistration