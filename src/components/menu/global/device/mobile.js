import React from "react"
import { Layout, Row, Col, Button, Drawer, Typography, Divider } from 'antd';
import LogoImage from "components/image/logo";
import { isLoggedIn } from "services/local-user";
import { Link } from 'gatsby'
import AvatarImage from "components/avatar/image";
import { getUserImage, getCurrentUser } from "services/local-user";

const { Paragraph } = Typography;
const { Header } = Layout;

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
                <Paragraph ellipsis style={{ marginTop: '8px', fontSize: '18px' }}>{userName}</Paragraph>
            </div>
            <Divider />
            <Link>
                <Paragraph ellipsis style={{ marginTop: '8px', fontSize: '18px' }}>プロフィール</Paragraph>
            </Link>
            <Link>
                <Paragraph ellipsis style={{ marginTop: '8px', fontSize: '18px' }}>本棚</Paragraph>
            </Link>
            <Link>
                <Paragraph ellipsis style={{ marginTop: '8px', fontSize: '18px' }}>著書管理</Paragraph>
            </Link>
            <Divider />
            <Link>
                <Paragraph ellipsis style={{ marginTop: '8px', fontSize: '18px' }}>アカウント設定</Paragraph>
            </Link>
            <Link>
                <Paragraph ellipsis style={{ marginTop: '8px', fontSize: '18px' }}>売上管理</Paragraph>
            </Link>
            <Divider />
            <Button type="link" block style={{ textAlign: 'left', fontSize: '18px', padding: '0px', color: 'rgba(0, 0, 0, 0.65)' }}>ログアウト</Button>
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
                <Button icon="menu" type="link" onClick={this.showDrawer} style={{ color: 'black' }} />
                <Drawer
                    placement="right"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <div style={{ padding: '20px' }}>

                    </div>
                    <DrawerItems />
                </Drawer>
            </div>
        );
    }
}

const MobileGlobalMenu = () => {
    return (
        <Header style={{ backgroundColor: 'white', padding: '0px 20px' }}>
            <Row type="flex" align="middle" >
                <Col span={11}>
                    <LogoImage />
                </Col>
                <Col span={13} style={{ textAlign: 'right' }}>
                    <MenuDrawer />
                </Col >
            </Row>
        </Header >
    )
}

export default MobileGlobalMenu