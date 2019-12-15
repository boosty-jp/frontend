import React from "react"
import { Layout } from 'antd';
import VerticalFooter from "./footer";
import ArticleHorizontalMenu from 'components/menu/horizontal-article'
import ActionButtonSider from "components/sider/action-buttons";

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
            <Layout >
                <ArticleHorizontalMenu />
                <Content>
                    <ActionButtonSider onCourse={false} />
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