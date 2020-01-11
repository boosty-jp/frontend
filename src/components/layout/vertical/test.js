import React from "react"
import { Layout } from 'antd';
import VerticalFooter from "./footer";
import HorizontalContentMenu from 'components/menu/horizontal-content'
import TestProgress from "components/test/view/answering/progress";

const { Content } = Layout;

class TestLayout extends React.Component {
    render() {
        return (
            <Layout>
                <div style={{ minHeight: '100vh' }}>
                    <HorizontalContentMenu />
                    <Content>
                        <div>
                            {this.props.children}
                        </div>
                    </Content>
                    <VerticalFooter />
                </div>
                <TestProgress />
            </Layout>
        )
    }
}
export default TestLayout;