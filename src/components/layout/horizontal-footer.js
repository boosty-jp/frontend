import React from "react"
import { Layout, Row, Col, Icon, Divider } from 'antd';
import InvertLogo from "components/logo/invert";
import { Link } from "gatsby";

const { Content, Sider } = Layout;

const footerSections = [
    {
        title: 'サービス',
        icon: 'global',
        pages: [
            { title: 'トップページ', link: '/' },
            { title: 'コースを作成する', link: '/plan/edit' },
            { title: '記事を作成する', link: '/article/edit' },
        ]
    },
    {
        title: 'ヘルプ',
        icon: 'question-circle',
        pages: [
            { title: '利用規約', link: '/terms' },
            { title: 'プライバシーポリシー', link: '/privacy' },
        ]
    },
    {
        title: '運営会社',
        icon: 'home',
        pages: [
            { title: '会社概要', link: '/company' },
            // { title: 'お知らせ', link: '/' },
            { title: 'お問い合わせ', link: '/', outerLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfGwFcq1TQGEFSDpnC5THQW2ECsgKMw9c_UnXrFkvgNZbatfQ/viewform?usp=sf_link' },
        ]
    },
]

const HorizontalFooter = () => {
    var now = new Date();
    var thisYear = now.getFullYear();
    return (
        <div style={{ backgroundColor: 'black', color: 'white' }}>
            <div style={{ padding: '20px', maxWidth: '100%', width: "1250px", margin: 'auto', position: 'relative', textAlign: 'center' }}>
                <Row style={{ padding: '20px', maxWidth: '100%', width: "1250px", margin: 'auto', position: 'relative' }}>
                    {footerSections.map((section) => (
                        <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{ marginBottom: '12px' }}>
                            <p style={{ fontSize: '16px', fontWeight: '500' }}>
                                <Icon type={section.icon} style={{ marginRight: '4px' }} />{section.title}
                            </p>
                            {section.pages.map(p => (
                                <Link to={p.link}>
                                    <p style={{ color: 'white' }}>{p.title}</p>
                                </Link>
                            ))}
                        </Col>
                    ))}
                </Row>
                <InvertLogo />
                <div style={{ marginTop: '12px' }}>Copyright <Icon type="copyright" />{thisYear} wever Inc.</div>
            </div>
        </div>
    )
}
export default HorizontalFooter;