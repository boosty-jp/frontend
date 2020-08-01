import React from "react"
import { Layout, Row, Col, Affix } from 'antd';
import VerticalFooter from "components/layout/vertical-footer";
import PageCharctorCountAnchor from "components/book/edit/page/charactor-count-anchor";
import MultipleSidebar from "components/lib/navigation/sidebar/multiple-bar";
import GlobalFirstSideBar from "components/sidebar/global";

const { Content } = Layout;

class ArticleEditPageLayout extends React.Component {
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Content style={{ backgroundColor: 'white' }}>
                    <Row>
                        <Col xs={0} sm={0} md={0} lg={7} xl={6} xxl={5} >
                            <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr' }}>
                                <div style={{ zIndex: '10' }}>
                                    <Affix offsetTop={0} style={{ height: "100vh" }}>
                                        <MultipleSidebar
                                            firstBar={<GlobalFirstSideBar />}
                                            secondBar={<></>}
                                        />
                                    </Affix>
                                </div>
                                <div>
                                    <VerticalFooter />
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={17} xl={18} xxl={19} style={{ paddingRight: '20px' }}>
                            {this.props.children}
                            <PageCharctorCountAnchor />
                        </Col>
                    </Row>
                </Content>
            </Layout >
        )
    }
}
export default ArticleEditPageLayout