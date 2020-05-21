import React from "react"
import { Typography, Row, Col } from 'antd';
import MoneyFeatureImage from "components/image/creator/money";
import FastFeatureImage from "components/image/creator/fast";
import MarkdownFeatureImage from "components/image/creator/markdown";
import CreatorBanner from "./banner";

const { Paragraph } = Typography;

const titleStyle = { color: 'black', fontSize: '24px', fontWeight: '400', marginTop: '16px' };

const CreatorRequirementComponent = () => {
    return (
        <div style={{ background: 'white' }}>
            <CreatorBanner />
            <div style={{ margin: '0 auto', padding: '60px 20px 100px 20px', maxWidth: '900px' }}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{ textAlign: 'center' }}>
                        <div >
                            <MoneyFeatureImage style={{ width: '100px', margin: '0 auto' }} />
                        </div>
                        <Paragraph style={titleStyle}>収益化</Paragraph>
                        <Paragraph >執筆した技術書は自由に価格設定でき<br />収益化が可能です</Paragraph>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{ textAlign: 'center' }}>
                        <div >
                            <MarkdownFeatureImage style={{ width: '100px', margin: '0 auto' }} />
                        </div>
                        <Paragraph style={titleStyle}>Markdownで書ける</Paragraph>
                        <Paragraph >専用のエディタが用意されており<br />馴染みのあるMarkdownで執筆できます</Paragraph>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{ textAlign: 'center' }}>
                        <div >
                            <FastFeatureImage style={{ width: '100px', margin: '0 auto' }} />
                        </div>
                        <Paragraph style={titleStyle}>手早く公開</Paragraph>
                        <Paragraph >審査や煩雑な登録はなく<br />少ないステップで公開できます</Paragraph>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default CreatorRequirementComponent