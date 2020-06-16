import React from "react"
import { message, notification, Layout, Row, Col, Button, Drawer, Typography, Divider, Affix } from 'antd';
import LogoImage from "components/image/logo";
import { isLoggedIn } from "services/local-user";
import { Link } from 'gatsby'
import AvatarImage from "components/avatar/image";
import { getUserImage, getCurrentUser } from "services/local-user";
import { MenuOutlined, BookOutlined, UserOutlined, HeartOutlined, EditOutlined, SettingOutlined, LogoutOutlined, MoneyCollectOutlined, HistoryOutlined, SearchOutlined } from "@ant-design/icons";
import getFirebase from "utils/firebase";
import { logout } from 'services/local-user'

const { Paragraph } = Typography;
const { Header } = Layout;
const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const linkStyle = { marginTop: '8px', fontSize: '18px' };

const executeLogout = () => {
    const firebase = getFirebase();
    firebase.auth().signOut().then(() => {
        logout(() => {
            navigate("/home");
            message.info('ログアウトしました', 5);
        });
    }).catch(() => {
        notification['error']({
            message: 'エラーが発生しました',
            description: 'お手数ですが、再度お試しください',
        });
    });
}

const GuestItems = () => {
    return (
        <div>
            <Link to="login">
                <Button type="primary" block size="large" ghost style={{ textAlign: 'left', marginBottom: '20px' }}>ログイン</Button>
            </Link>
            <Link to="/signup">
                <Button type="primary" block size="large" style={{ textAlign: 'left' }}>会員登録</Button>
            </Link>
        </div>
    )
}

const UserItems = () => {
    const avatarImage = getUserImage();
    const userName = getCurrentUser().userName;

    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <AvatarImage imageUrl={avatarImage} displayName={userName} size={60} style={{ fontSize: '30px' }} />
                <Paragraph ellipsis style={linkStyle}>{userName}</Paragraph>
            </div>
            <Divider />
            <Link to="/account/profile">
                <Paragraph ellipsis style={linkStyle}>
                    <UserOutlined style={{ marginRight: '8px' }} /><span>プロフィール</span>
                </Paragraph>
            </Link>
            <Link to="/book/own">
                <Paragraph ellipsis style={linkStyle}>
                    <BookOutlined style={{ marginRight: '8px' }} /><span>本棚</span>
                </Paragraph>
            </Link>
            <Link to="/like">
                <Paragraph ellipsis style={linkStyle}>
                    <HeartOutlined style={{ marginRight: '8px' }} /><span>お気に入り</span>
                </Paragraph>
            </Link>
            <Link to="/book/edit/list">
                <Paragraph ellipsis style={linkStyle}>
                    <EditOutlined style={{ marginRight: '8px' }} /><span>著書管理</span>
                </Paragraph>
            </Link>
            <Divider />
            <Link to="/account/history">
                <Paragraph ellipsis style={linkStyle}>
                    <HistoryOutlined style={{ marginRight: '8px' }} /><span>購入履歴</span>
                </Paragraph>
            </Link>
            <Link to="/account/settings/base">
                <Paragraph ellipsis style={linkStyle}>
                    <SettingOutlined style={{ marginRight: '8px' }} /><span>アカウント設定</span>
                </Paragraph>
            </Link>
            <Link to="/account/sales">
                <Paragraph ellipsis style={linkStyle}>
                    <MoneyCollectOutlined style={{ marginRight: '8px' }} /><span>売上管理</span>
                </Paragraph>
            </Link>
            <Divider />
            <Button
                block
                type="link"
                icon={<LogoutOutlined />}
                onClick={executeLogout}
                style={{ textAlign: 'left', fontSize: '18px', padding: '0px', color: 'rgba(0, 0, 0, 0.65)' }}
            >
                ログアウト
            </Button>
        </>
    )
}

const DrawerItems = () => {
    if (!isLoggedIn()) {
        return (
            <GuestItems />
        )
    } else {
        return (
            <UserItems />
        )
    }
}

class MenuDrawer extends React.Component {
    state = { visible: false };

    showDrawer = () => { this.setState({ visible: true, }); };

    onClose = () => { this.setState({ visible: false, }); };

    render() {
        return (
            <div>
                <Link to="/search">
                    <SearchOutlined style={{ marginRight: '12px', fontSize: '16px', color: "#262626" }} />
                </Link>
                <Button icon={<MenuOutlined />} type="link" onClick={this.showDrawer} style={{ color: 'black' }} />
                <Drawer
                    placement="right"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <div style={{ paddingTop: '40px' }}>
                        <DrawerItems />
                    </div>
                </Drawer>
            </div>
        );
    }
}

const MobileGlobalMenu = () => {
    return (
        <Affix offsetTop={0}>
            <Header style={{ backgroundColor: 'white', padding: '0px 20px', boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }}>
                <Row type="flex" align="middle" >
                    <Col span={11}>
                        <LogoImage />
                    </Col>
                    <Col span={13} style={{ textAlign: 'right' }}>
                        <MenuDrawer />
                    </Col >
                </Row>
            </Header >
        </Affix>
    )
}

export default MobileGlobalMenu