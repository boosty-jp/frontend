import React from "react"
import { Layout, Button, Input, Row, Col } from 'antd';
import styled from 'styled-components'
import Logo from "../logo";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { };
const { Header } = Layout;

const RoundSearch = styled(Input.Search)`
  .ant-input {
    border-radius: 500rem;
  }
`;

const HorizontalMenu = () => {
    return (
        <Header style={{ background: '#fff', padding: '0px' }} >
            <div style={{ maxWidth: '100%', width: "1250px", margin: 'auto', padding: '0 20px 0 20px', position: 'relative' }}>
                <Row>
                    <Col span={16}>
                        <Logo />
                        <RoundSearch
                            placeholder="検索する"
                            onSearch={value => console.log(value)}
                            onChange={e => console.log(e.target.value)}
                            style={{ width: 300, height: 40, marginLeft: '8px' }}
                        />
                    </Col>
                    <Col span={8} style={{ textAlign: 'right' }}>
                        <Button style={{ marginRight: '8px' }} onClick={() => navigate('/login')}>ログイン</Button>
                        <Button type="primary">会員登録</Button>
                    </Col >
                </Row>
            </div>
        </Header>
    )
}
export default HorizontalMenu