import React from "react"
import { Row, Col, Typography } from 'antd';
import HeroImage from 'images/hero_item.png'
const { Title, Paragraph, Text } = Typography;

const TopEyecatch = () => {
    return (
        <div style={{ background: 'white' }}>
            <div style={{ padding: '50px', maxWidth: '100%', width: "1250px", margin: 'auto', position: 'relative' }}>
                <Row type="flex" justify="center" align="top" >
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <div style={{ textAlign: 'center' }}>
                            <Title level={2}>学習コンテンツに迷いません</Title>
                            <Paragraph>何を、どのような順番で学べばよいか？</Paragraph>
                            <Paragraph>「プラン」には、目的に応じたコンテンツがまとまっています。</Paragraph>
                            <Paragraph>あなたの学びたいことが、きっとあるはずです。</Paragraph>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <div style={{ textAlign: 'center' }}>
                            <img src={HeroImage} style={{ width: '80%', height: 'auto' }} />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default TopEyecatch