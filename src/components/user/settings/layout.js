import React, { useState, useEffect, useRef } from "react"
import { Layout, Menu } from 'antd';
import { Link } from 'gatsby'

const { Content, Sider } = Layout;

const VerticalContents = ({ page, children }) => (
    <>
        <Sider
            width="180"
            style={{ background: '#fff' }}
        >
            <Menu
                mode="vertical"
                defaultSelectedKeys={[page]}
                style={{ height: '100%' }}
            >
                <Menu.Item key="base">
                    <Link to="account/settings/base">基本情報</Link>
                </Menu.Item>
                <Menu.Item key="password">
                    <Link to="account/settings/password">パスワード</Link>
                </Menu.Item>
                <Menu.Item key="mail">
                    <Link to="account/settings/mail">メール</Link>
                </Menu.Item>
            </Menu>
        </Sider>
        <Content style={{ padding: '12px', minHeight: 350, height: '100%' }}>{children}</Content>
    </>
)

const HorizontalContents = ({ page, children }) => (
    <>
        <Sider
            width="100%"
            style={{ background: '#fff' }}
        >
            <Menu
                mode="horizontal"
                defaultSelectedKeys={[page]}
                style={{ width: '100%' }}
            >
                <Menu.Item key="base">
                    <Link to="account/settings/base">基本情報</Link>
                </Menu.Item>
                <Menu.Item key="password">
                    <Link to="account/settings/password">パスワード</Link>
                </Menu.Item>
                <Menu.Item key="mail">
                    <Link to="account/settings/mail">メール</Link>
                </Menu.Item>
            </Menu>
            <Content style={{ padding: '12px', minHeight: 350 }}>{children}</Content>
        </Sider>
    </>
)

const AccountEditLayout = ({ children, page }) => {
    const [width, setWidth] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setWidth(ref.current.clientWidth)
    })

    let Contents;
    if (width > 600) {
        Contents = VerticalContents;
    } else {
        Contents = HorizontalContents;
    }

    return (
        <div ref={ref} style={{ padding: '20px' }}>
            <Layout style={{ background: '#fff' }}>
                <Contents page={page} children={children} />
            </Layout>
        </div>
    )
}

export default AccountEditLayout