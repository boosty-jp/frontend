import React from 'react'
import { Layout, Row, Col, Affix } from 'antd';
import { Link } from 'gatsby';
import VerticalMenu from "components/menu/vertical";
import VerticalFooter from "components/layout/vertical-footer";
import MobileGlobalMenu from 'components/menu/global/device/mobile';

const pages = [
    { key: 'term', title: '利用規約', link: '/terms' },
    { key: 'privacy', title: 'プライバシーポリシー', link: '/privacy' },
]

const pageMenuStyle = {
    padding: '30px 0px',
    width: '100%',
    height: '100vh',
    borderRight: '1px solid #d6e4ff',
}

const TermLayout = ({ children, activePage }) => {
    return (
        <Layout style={{ minHeight: '100vh', maxWidth: '100vw', background: 'white', overflow: 'hidden' }}>
            <Row gutter={[16, 16]}>
                <Col xs={0} sm={0} md={0} lg={6} xl={5} xxl={4} >
                    <Affix offsetTop={0}>
                        <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', backgroundColor: '#F7FAFF', }}>
                            <div style={{ height: "100vh", zIndex: '10' }}>
                                <VerticalMenu />
                            </div>
                            <div style={pageMenuStyle}>
                                {pages.map(page => {
                                    const color = page.key === activePage ? "rgb(47, 84, 235)" : "rgba(0, 0, 0, 0.65)";
                                    const background = page.key === activePage ? "rgb(214, 228, 255)" : "#F7FAFF";
                                    return (
                                        <Link to={page.link}>
                                            <p style={{ color, background, padding: '10px 20px', marginBottom: '0px' }}>{page.title}</p>
                                        </Link>
                                    )
                                })}
                            </div >
                        </div>
                    </Affix>
                </Col>
                <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                    <MobileGlobalMenu />
                </Col>
                <Col xs={24} sm={24} md={24} lg={18} xl={19} xxl={20}>
                    <div style={{ background: 'white', borderRadius: '0.25rem', padding: '20px', maxWidth: '900px', marginTop: '30px' }}>
                        {children}
                    </div>
                </Col>
            </Row>
            <VerticalFooter />
        </Layout>
    )
}

export default TermLayout