import React from "react"
import { connect } from 'react-redux'
import { Icon, Affix, Button, Layout, Tooltip } from 'antd';
import VerticalFooter from "./footer";
import TestEditMenu from "components/menu/horizontal-test-edit";

const { Content } = Layout;

class TestEditorLayoutComponent extends React.Component {
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <TestEditMenu />
                <Content>
                    <div >
                        {this.props.children}
                    </div>
                </Content>
                <VerticalFooter />
            </Layout >
        )
    }
}

const mapStateToProps = state => ({
    textCount: state.articleEdit.textCount,
    blockCount: state.articleEdit.blockCount,
})

const TestEditorLayout = connect(mapStateToProps)(TestEditorLayoutComponent)
export default TestEditorLayout;