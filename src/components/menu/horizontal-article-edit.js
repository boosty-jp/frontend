import React from "react"
import { Layout, Button, Row, Col, Affix } from 'antd';
import Logo from "components/logo";
const { Header } = Layout;


const ArticleEditMenu = () => {
    return (
        <Affix offsetTop={0}>
            <Header style={{ background: '#fff', padding: '0px 8px' }}>
                <div style={{ maxWidth: '740px', width: '100%', margin: '0 auto' }}>
                    <Row>
                        <Col span={11} style={{ textAlign: 'left' }}>
                            <Logo />
                        </Col>
                        <Col span={13} style={{ textAlign: 'right' }}>
                            <Button style={{ marginLeft: '12px' }}>下書き</Button>
                            <Button type="primary" style={{ marginLeft: '12px' }}>公開</Button>
                        </Col>
                    </Row>
                </div>
            </Header >
        </Affix>
    )
}

export default ArticleEditMenu