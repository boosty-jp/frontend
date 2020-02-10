import React, { useState, useEffect, useRef } from "react"
import { connect } from 'react-redux'
import { Layout, Menu, Typography } from 'antd';
import { Link } from 'gatsby'
import BookStatusCard from "./status/status-card";

const { Content, Sider } = Layout;
const { Paragraph } = Typography;

const pages = [
    { key: 'image', link: 'book/edit/image', title: 'カバー画像' },
    { key: 'base', link: 'book/edit/base', title: '基本情報' },
    { key: 'sections', link: 'book/edit/sections', title: 'ページ' },
    { key: 'feature', link: 'book/edit/feature', title: '特徴' },
    { key: 'target', link: 'book/edit/target', title: '対象読者' },
    { key: 'tag', link: 'book/edit/tag', title: 'タグ' },
]

const VerticalContents = ({ page, children, id }) => (
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
                            <Link to={p.link + "/?id=" + id}>{p.title}</Link>
                        </Menu.Item>
                    )
                })}
            </Menu>
        </Sider>
        <Content style={{ padding: '12px', minHeight: 350, height: '100%' }}>{children}</Content>
    </>
)

const HorizontalContents = ({ page, children, id }) => (
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
                            <Link to={p.link + "/?id=" + id}>{p.title}</Link>
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

const BookEditLayoutComponent = (props) => {
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

    const bookTitle = props.title ? props.title : "タイトル未設定の本"
    return (
        <div style={{ marginTop: '20px' }}>
            <Paragraph style={{ textAlign: 'center', fontSize: '28px', color: 'black' }}>「{bookTitle}」の編集</Paragraph>
            <BookStatusCard id={props.id} />
            <div ref={ref} style={{ ...cardStyle, marginTop: '20px' }}>
                <Layout style={{ background: '#fff' }}>
                    <Contents page={props.page} children={props.children} id={props.id} />
                </Layout>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    title: state.bookEdit.title,
})

const BookEditLayout = connect(mapStateToProps)(BookEditLayoutComponent)
export default BookEditLayout