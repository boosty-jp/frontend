import React from "react"
import { connect } from 'react-redux'
import { Icon, Affix, Button, Layout, Tooltip } from 'antd';
import VerticalFooter from "./footer";
import ArticleEditMenu from "components/menu/horizontal-article-edit";
import ArticlePreview from "components/article/edit/preview";

const { Content } = Layout;

class ArticleEditorLayoutComponent extends React.Component {
    state = {
        collapsed: false,
        preview: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout >
                <ArticleEditMenu />
                <Content>
                    <div >
                        {this.props.children}
                    </div>
                    <Affix offsetBottom={20} style={{ width: '200px', margin: '0 0px 0 auto' }}>
                        <div style={{ textAlign: 'right', padding: '20px' }}>
                            <div>
                                <ArticlePreview />
                            </div>
                            <div style={{ marginTop: '8px' }}>
                                <Tooltip placement="left" title="書き方のヒント">
                                    <Button shape="circle" icon="bulb" />
                                </Tooltip>
                            </div>
                            <div style={{ marginTop: '8px' }}>
                                {this.props.textCount > 20000 ?
                                    <Tooltip placement="left" title="投稿できる最大文字数は20000文字です。">
                                        <span style={{ marginTop: '8px', color: 'red' }}><Icon type="warning" style={{ marginRight: '8px' }} />{this.props.textCount}文字</span>
                                    </Tooltip>
                                    :
                                    <p style={{ marginTop: '8px', color: 'grey' }}>{this.props.textCount}文字</p>
                                }
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
})

const ArticleEditorLayout = connect(mapStateToProps)(ArticleEditorLayoutComponent)
export default ArticleEditorLayout;