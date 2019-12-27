import React from "react"
import { Layout } from 'antd';
import VerticalFooter from "./footer";
import ArticleHorizontalMenu from 'components/menu/horizontal-article'
import ActionButtonSider from "components/sider/action-buttons";
import ArticleAnchorMenu from "components/sider/article-anchor";

const { Content } = Layout;

class ArticleLayout extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <ArticleHorizontalMenu />
                <Content>
                    <ActionButtonSider onCourse={false} />
                    <ArticleAnchorMenu />
                    <div>
                        {this.props.children}
                    </div>
                </Content>
                <VerticalFooter />
            </Layout>
        )
    }
}
export default ArticleLayout;