import React from "react"
import { Input, Drawer, Row, Col, Icon } from 'antd';
import Logo from "components/logo";
import styled from 'styled-components'
import GuestItems from "components/menu/horizontal-items/guest-items";
import UserItems from "components/menu/horizontal-items/login-items";
import { isLoggedIn } from "services/local-user";

const RoundSearch = styled(Input.Search)`
  .ant-input {
    border-radius: 500rem;
  }
`;

class MediumMenuItems extends React.Component {
    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <Row>
                <Col span={20}>
                    <Logo />
                    <RoundSearch
                        placeholder="検索する"
                        onSearch={value => console.log(value)}
                        onChange={e => console.log(e.target.value)}
                        style={{ width: 240, height: 32, marginLeft: '20px' }}
                    />
                </Col>
                <Col span={4} style={{ textAlign: 'right' }}>
                    <Icon type="menu" style={{ fontSize: '20px' }} onClick={this.showDrawer} />
                </Col >
                <Drawer
                    title="メニュー"
                    placement="right"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    {isLoggedIn() ?
                        <UserItems />
                        :
                        <GuestItems />
                    }
                </Drawer>
            </Row>
        )
    }
}

export default MediumMenuItems