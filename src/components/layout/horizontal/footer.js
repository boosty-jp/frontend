import React from "react"
import { Row, Col } from 'antd';
import InvertLogo from "components/logo/invert";
import { Link } from "gatsby";
import { GlobalOutlined, QuestionCircleOutlined, HomeOutlined, CopyrightCircleOutlined } from "@ant-design/icons";

const footerSections = [
    {
        title: 'サービス',
        icon: <GlobalOutlined />,
        pages: [
            { title: 'トップページ', link: '/home' },
            { title: '本棚', link: '/plan/edit' },
            { title: '著書', link: '/article/edit' },
        ]
    },
    {
        title: 'ヘルプ',
        icon: <QuestionCircleOutlined />,
        pages: [
            { title: 'よくある質問', link: '/faq' },
            { title: 'お知らせ', link: '/' },
            { title: 'お問い合わせ', link: '/', outerLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfGwFcq1TQGEFSDpnC5THQW2ECsgKMw9c_UnXrFkvgNZbatfQ/viewform?usp=sf_link' },
        ]
    },
    {
        title: '運営会社',
        icon: <HomeOutlined />,
        pages: [
            { title: '会社概要', outerLink: "https://wever.co.jp" },
            { title: '利用規約', link: '/terms' },
            { title: 'プライバシーポリシー', link: '/privacy' },
        ]
    },
]

const HorizontalFooter = () => {
    var now = new Date();
    var thisYear = now.getFullYear();
    return (
        <div style={{ backgroundColor: 'black', color: 'white' }}>
            <div style={{ padding: '20px', maxWidth: '100%', width: "900px", margin: 'auto', position: 'relative', textAlign: 'center' }}>
                <Row style={{ padding: '20px', maxWidth: '100%', width: "900px", margin: 'auto', position: 'relative' }}>
                    {footerSections.map((section) => (
                        <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{ marginBottom: '12px' }} key={section.title}>
                            <p style={{ fontSize: '16px', fontWeight: '500' }}>
                                <span style={{ marginRight: '6px' }}>{section.icon}</span>{section.title}
                            </p>
                            {section.pages.map(p => {
                                if (p.outerLink) {
                                    return (
                                        <a href={p.outerLink} key={p.title}>
                                            <p style={{ color: 'white' }}>{p.title}</p>
                                        </a>
                                    )
                                }
                                return (
                                    <Link to={p.link} key={p.title}>
                                        <p style={{ color: 'white' }}>{p.title}</p>
                                    </Link>
                                )
                            }
                            )}
                        </Col>
                    ))}
                </Row>
                <InvertLogo />
                <div style={{ marginTop: '12px' }}>Copyright <CopyrightCircleOutlined />{thisYear} wever Inc.</div>
            </div>
        </div>
    )
}
export default HorizontalFooter;