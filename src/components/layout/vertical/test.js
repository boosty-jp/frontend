import React from "react"
import { Layout } from 'antd';
import VerticalFooter from "./footer";
import HorizontalContentMenu from 'components/menu/horizontal-content'

const { Content } = Layout;

class TestLayout extends React.Component {
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <HorizontalContentMenu />
                <Content>
                    <div>
                        {this.props.children}
                    </div>
                </Content>
                <VerticalFooter />
            </Layout>
        )
    }
}
export default TestLayout;