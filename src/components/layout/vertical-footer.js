import React from "react"
import { Layout, Row, Col, Icon } from 'antd';
import InvertLogo from "components/logo/invert";
import { Link } from "gatsby";

const { Content, Sider } = Layout;

const footerSections = [
    {
        title: 'サービス',
        icon: 'global',
        pages: [
            { title: 'トップページ', link: '/' },
            { title: 'プランを作成する', link: '/plan/edit' },
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

const VerticalFooter = () => {
    var now = new Date();
    var thisYear = now.getFullYear();
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ marginBottom: '12px' }}>
                <Link to='terms'>
                    <span style={{ color: 'rgba(0,0,0,.65)', marginRight: '20px' }}>利用規約</span>
                </Link>
                <Link to='terms'>
                    <span style={{ color: 'rgba(0,0,0,.65)', marginRight: '20px' }}>プライバシーポリシー</span>
                </Link>
                <a><Icon type='twitter' style={{ color: 'rgba(0,0,0,.65)', marginRight: '8px' }} /></a>
            </div>
            <div>Copyright <Icon type="copyright" />{thisYear} wever Inc.</div>
        </div>
    )
}
export default VerticalFooter;