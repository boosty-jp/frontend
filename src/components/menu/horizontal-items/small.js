import React from "react"
import Logo from "components/logo";
import { Drawer, Row, Col, Icon, Input } from 'antd';
import GuestItems from "components/menu/horizontal-items/guest-items";
import UserItems from "components/menu/horizontal-items/login-items";
import { isLoggedIn } from "services/local-user";

const { Search } = Input

export default class SmallMenuItems extends React.Component {
    state = { onMenu: false, onSearch: false };

    showMenu = () => {
        this.setState({
            onMenu: true,
        });
    };

    closeMenu = () => {
        this.setState({
            onMenu: false,
        });
    };

    showSearch = () => {
        this.setState({
            onSearch: true,
        });
    };

    closeSearch = () => {
        this.setState({
            onSearch: false,
        });
    };

    render() {
        return (
            <>
                <Row>
                    <Col span={14}>
                        <Logo />
                    </Col>
                    <Col span={10} style={{ textAlign: 'right' }}>
                        <Icon type="search" style={{ marginRight: '20px', fontSize: '20px' }} onClick={this.showSearch} />
                        <Icon type="menu" style={{ fontSize: '20px' }} onClick={this.showMenu} />
                    </Col >
                </Row>
                <Drawer
                    title="メニュー"
                    closable={true}
                    placement="right"
                    onClose={this.closeMenu}
                    visible={this.state.onMenu}
                >
                    {isLoggedIn() ?
                        <UserItems />
                        :
                        <GuestItems />
                    }
                </Drawer>
                <Drawer
                    title={
                        <Search
                            placeholder="検索ワードを入力してください"
                            onSearch={value => console.log(value)}
                            style={{ width: '90%' }}
                        />
                    }
                    closable={true}
                    placement="top"
                    onClose={this.closeSearch}
                    visible={this.state.onSearch}
                    height={60}
                >
                </Drawer>
            </>
        )
    }
}
