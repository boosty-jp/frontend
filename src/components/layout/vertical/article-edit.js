import React from "react"
import { Affix, Button, Layout } from 'antd';
import VerticalMenu from "components/menu/vertical";
import VerticalFooter from "./footer";
import ArticleEditSider from "components/sider/article-edit";
import ArticleEditMenu from "components/menu/horizontal-article-edit";

const { Content } = Layout;

class ArticleEditLayout extends React.Component {
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
            <Layout>
                <ArticleEditMenu />
                <Content >
                    <div >
                        {this.props.children}
                    </div>
                    <Affix offsetBottom={20}>
                        <div style={{ textAlign: 'right', padding: '10px' }}>
                            <div>
                                <Button shape="circle" icon="eye" />
                            </div>
                            <div style={{ marginTop: '8px' }}>
                                <Button shape="circle" icon="bulb" />
                            </div>
                            <div style={{ marginTop: '8px' }}>
                                <span style={{ color: 'grey' }}>2130文字</span>
                            </div>
                        </div>
                    </Affix>
                </Content>
                <VerticalFooter />
            </Layout >
        )
    }
}
export default ArticleEditLayout;