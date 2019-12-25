import React, { useState, useEffect, useRef } from "react"
import { Layout, Menu } from 'antd';
import { Link } from 'gatsby'

const { Content, Sider } = Layout;
const pages = [
    { key: 'base', link: 'account/settings/base', title: '基本情報' },
    { key: 'public', link: 'account/settings/public', title: '公開設定' },
    { key: 'password', link: 'account/settings/password', title: 'パスワード' },
    { key: 'mail', link: 'account/settings/mail', title: 'メール' },
    { key: 'delete', link: 'account/settings/delete', title: 'アカウント削除' },
]

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
                {pages.map(p => {
                    return (
                        <Menu.Item key={p.key}>
                            <Link to={p.link}>{p.title}</Link>
                        </Menu.Item>
                    )
                })}
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
                {pages.map(p => {
                    return (
                        <Menu.Item key={p.key}>
                            <Link to={p.link}>{p.title}</Link>
                        </Menu.Item>
                    )
                })}
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