import React from "react"
import Logo from "components/logo";
import { Input, Row, Col } from 'antd';
import GuestButtons from 'components/menu/buttons/guest'
import UserButtons from "components/menu/buttons/user";
import styled from 'styled-components'

const RoundSearch = styled(Input.Search)`
  .ant-input {
    border-radius: 500rem;
  }
`;

const isLogin = false

const LargeMenuItems = () => (
    <Row>
        <Col span={17}>
            <Logo />
            <RoundSearch
                placeholder="検索する"
                onSearch={value => console.log(value)}
                onChange={e => console.log(e.target.value)}
                style={{ width: 280, height: 32, marginLeft: '20px' }}
            />
        </Col>
        <Col span={7} style={{ textAlign: 'right' }}>
            {isLogin ?
                <UserButtons />
                :
                <GuestButtons />
            }
        </Col >
    </Row>
)

export default LargeMenuItems