import React from "react"
import { Layout, Affix, Row, Col } from 'antd';
import PcBookViewMenu from 'components/book/view/page/menu/pc'
import MobileBookViewMenuComponent from 'components/book/view/page/menu/mobile'

const { Content } = Layout;

class PageViewLayout extends React.Component {
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Content style={{ backgroundColor: 'white' }}>
                    <Row>
                        <Col xs={0} sm={0} md={0} lg={7} xl={6} xxl={5} >
                            <PcBookViewMenu id={this.props.id} bookId={this.props.bookId} />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={17} xl={18} xxl={19}>
                            {this.props.children}
                            <Affix offsetBottom={20} style={{ width: '60px', margin: '0 0 0 auto' }}>
                                <MobileBookViewMenuComponent id={this.props.id} bookId={this.props.bookId} />
                            </Affix>
                        </Col>
                    </Row>
                </Content>
            </Layout >
        )
    }
}

export default PageViewLayout;