import React from "react"
import { Typography, Row, Col } from 'antd';
import LogoInvertImage from "components/image/logo/invert";
import { TwitterOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

class GlobalFooter extends React.Component {
    render() {
        return (
            <div style={{ backgroundColor: '#000000' }}>
                <div style={{ maxWidth: "900px", margin: 'auto', padding: '30px 0px' }}>
                    <Row type="flex" align="middle" gutter={32}>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} >
                            <LogoInvertImage />
                        </Col>
                        <Col xs={24} sm={24} md={9} lg={9} xl={9} style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <Paragraph style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>サービス</Paragraph>
                            <Paragraph ><a href="https:/wever.co.jp" style={{ color: 'white', fontSize: '14px' }}>運営会社</a></Paragraph>
                            <Paragraph style={{ marginBottom: '0px' }}><a href="https://docs.google.com/forms/d/e/1FAIpQLScyfO5CyOAcBlRni8zG3zluxnK89Cw9LXgxY7QE3qgOj_T82w/viewform" style={{ color: 'white', fontSize: '14px' }}>お問い合わせ</a></Paragraph>
                        </Col >
                        <Col xs={24} sm={24} md={9} lg={9} xl={9} style={{ textAlign: 'center' }}>
                            <Paragraph style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>SNS</Paragraph>
                            <Paragraph ><a href="https://twitter.com/boosty_official" style={{ color: 'white', fontSize: '14px' }}>
                                <TwitterOutlined style={{ marginRight: '10px' }} />Twitter</a>
                            </Paragraph>
                            <Paragraph ><a href="https://twitter.com/tom__yam" style={{ color: 'white', fontSize: '14px' }}>開発者</a></Paragraph>
                        </Col >
                    </Row>
                </div>
            </div>
        )
    }
}

export default GlobalFooter