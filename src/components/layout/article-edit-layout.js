import React from "react"
import { Layout, Row, Col } from 'antd';
import PcBookEditMenu from 'components/book/view/page/menu/pc-edit'
import PageCharctorCountAnchor from "components/book/edit/page/charactor-count-anchor";

const { Content } = Layout;

class ArticleEditLayout extends React.Component {

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Content style={{ backgroundColor: 'white' }}>
                    <Row>
                        <Col xs={0} sm={0} md={0} lg={7} xl={6} xxl={5} >
                            <PcBookEditMenu />
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
export default ArticleEditLayout;