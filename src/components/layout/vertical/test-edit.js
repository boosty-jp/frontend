import React from "react"
import { connect } from 'react-redux'
import { Affix, Layout } from 'antd';
import VerticalFooter from "./footer";
import TestEditMenu from "components/menu/horizontal-test-edit";
import TestPreview from "components/test/edit/preview";

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
                    <Affix offsetBottom={20} style={{ width: '200px', margin: '0 0px 0 auto' }}>
                        <div style={{ textAlign: 'right', padding: '20px' }}>
                            <div>
                                <TestPreview />
                            </div>
                        </div>
                    </Affix>
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