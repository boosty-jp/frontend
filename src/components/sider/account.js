import React from "react"
import { Layout, Menu, Icon, Avatar } from 'antd';
import InvertLogo from "components/logo/invert";
import { Link } from "gatsby";

const { Sider } = Layout;

const AccountSider = ({ collapsed, onBreakpoint, selectedMenu, openedMenu }) => {
    return (
        <Sider
            breakpoint="sm"
            trigger={null}
            collapsible
            collapsedWidth="0"
            collapsed={collapsed}
            onBreakpoint={() => onBreakpoint()}
        >
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <InvertLogo />
            </div>
            <div style={{ textAlign: 'center' }}>
                <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{ padding: '0.25rem', backgroundColor: 'white', border: '1px solid #dee2e6' }} />
                <p style={{ color: 'white', marginTop: '8px' }}>Tomoki Yamashita</p>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultOpenKeys={openedMenu}
                defaultSelectedKeys={selectedMenu}
            >
                <Menu.SubMenu
                    key="account"
                    title={
                        <span>
                            <Icon type="user" />
                            <span>アカウント</span>
                        </span>
                    }
                >
                    <Menu.Item key="account-profile">
                        <Link to="/account/profile">プロフィール</Link>
                    </Menu.Item>
                    <Menu.Item key="account-settings">
                        <Link to="/account/settings/base">アカウント設定</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="study"
                    title={
                        <span>
                            <Icon type="highlight" />
                            <span>学習管理</span>
                        </span>
                    }
                >
                    <Menu.Item key="learning">
                        <Link to="/account/contents/learning">学習中</Link>
                    </Menu.Item>
                    <Menu.Item key="learned">
                        <Link to="/account/contents/learned">学習完了</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="contents"
                    title={
                        <span>
                            <Icon type="container" />
                            <span>コンテンツ</span>
                        </span>
                    }
                >
                    <Menu.Item key="contents-manage">
                        <Link to="/account/contents/manage">コンテンツ編集</Link>
                    </Menu.Item>
                    <Menu.Item key="contents-liked">
                        <Link to="/account/contents/liked">お気に入り</Link>
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </Sider>
    )
}

export default AccountSider;