import React, { useState, useEffect, useRef } from "react"
import { Layout, Menu, Typography } from 'antd';
import { Link } from 'gatsby'
import BookStatusCard from "./status-card";

const { Content, Sider } = Layout;
const { Paragraph } = Typography;

const pages = [
    { key: 'base', link: 'book/edit/base', title: '基本情報' },
    { key: 'page', link: 'book/edit/page', title: 'ページ' },
    { key: 'feature', link: 'book/edit/feature', title: '特徴' },
    { key: 'target', link: 'book/edit/target', title: '対象読者' },
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

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontColor: 'black',
}

const BookEditLayout = ({ children, page }) => {
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
        <div style={{ marginTop: '20px' }}>
            <Paragraph style={{ textAlign: 'center', fontSize: '28px', color: 'black' }}>「React/Redux」の編集</Paragraph>
            <BookStatusCard />
            <div ref={ref} style={{ ...cardStyle, marginTop: '20px' }}>
                <Layout style={{ background: '#fff' }}>
                    <Contents page={page} children={children} />
                </Layout>
            </div>
        </div>
    )
}

export default BookEditLayout