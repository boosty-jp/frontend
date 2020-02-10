import React from "react"
import { connect } from 'react-redux'
import { Icon, Affix, Button, Layout, Tooltip } from 'antd';
import PageEditMenu from "components/menu/page-edit-menu";
import HorizontalFooter from 'components/layout/horizontal/footer'
import PagePreview from "components/book/edit/page/preview";

const { Content } = Layout;

class PageEditLayoutComponent extends React.Component {
    render() {
        return (
            <Layout >
                <PageEditMenu bookId={this.props.bookId} />
                <Content style={{ backgroundColor: 'white' }}>
                    <div >
                        {this.props.children}
                    </div>
                    <Affix offsetBottom={20} style={{ width: '200px', margin: '0 0px 0 auto' }}>
                        <div style={{ textAlign: 'right', padding: '20px', }}>
                            <div>
                                <PagePreview />
                            </div>
                            <div style={{ marginTop: '8px' }}>
                                <Tooltip placement="left" title="書き方のヒント">
                                    <Button shape="circle" icon="bulb" />
                                </Tooltip>
                            </div>
                            <div style={{ marginTop: '12px' }}>
                                {this.props.textCount > 20000 ?
                                    <Tooltip placement="left" title="投稿できる最大文字数は20000文字です。">
                                        <span style={{ marginTop: '8px', color: 'red' }}><Icon type="warning" style={{ marginRight: '8px' }} />{this.props.textCount}文字</span>
                                    </Tooltip>
                                    :
                                    <p style={{ marginTop: '8px', color: 'grey' }}>{this.props.textCount}文字</p>
                                }
                            </div>
                            <div style={{ marginTop: '8px' }}>
                                {this.props.blockCount > 100 ?
                                    <Tooltip placement="left" title="投稿できる最大ブロックは100ブロックです。">
                                        <span style={{ marginTop: '8px', color: 'red' }}><Icon type="warning" style={{ marginRight: '8px' }} />{this.props.blockCount}ブロック</span>
                                    </Tooltip>
                                    :
                                    <p style={{ marginTop: '8px', color: 'grey' }}>{this.props.blockCount}ブロック</p>
                                }
                            </div>
                        </div>
                    </Affix>
                </Content>
                <HorizontalFooter />
            </Layout >
        )
    }
}

const mapStateToProps = state => ({
    canPreview: state.pageEdit.canPreview,
    textCount: state.pageEdit.textCount,
    blockCount: state.pageEdit.blockCount,
})

const PageEditLayout = connect(mapStateToProps)(PageEditLayoutComponent)
export default PageEditLayout;