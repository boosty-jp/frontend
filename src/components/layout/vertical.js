import React from "react"
import { Layout } from 'antd';
import PropTypes from "prop-types"
import { Affix, Row, Col } from 'antd';
import VerticalMenu from "components/menu/vertical";
import VerticalFooter from "components/layout/vertical-footer";
import MobileGlobalMenu from "components/menu/global/device/mobile";

const { Content } = Layout;

const VerticalLayout = ({ children, activeMenuKey }) => {
    var content = <Content >{children}</Content>

    return (
        <Layout style={{ minHeight: '100vh', maxWidth: '100vw', background: '#F7FAFF', overflow: 'hidden' }}>
            <Row>
                <Col xs={0} sm={0} md={0} lg={24} xl={24} xxl={24}>
                    <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', }}>
                        <div style={{ zIndex: '10' }}>
                            <Affix offsetTop={0} style={{ height: "100vh" }}>
                                <VerticalMenu activeKey={activeMenuKey} />
                            </Affix>
                        </div>
                        <div>
                            {content}
                            <VerticalFooter />
                        </div>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                    <Affix offsetTop={0} >
                        <MobileGlobalMenu />
                    </Affix>
                    <div>
                        {content}
                        <VerticalFooter />
                    </div>
                </Col>
            </Row>
        </Layout>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default VerticalLayout