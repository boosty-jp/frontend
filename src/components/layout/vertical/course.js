import React from "react"
import { Layout } from 'antd';
import VerticalMenu from "components/menu/vertical";
import VerticalFooter from "./footer";
import CourseDetailSider from "components/sider/course";

const { Content } = Layout;

class CourseLayout extends React.Component {
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
                <CourseDetailSider
                    collapsed={this.state.collapsed}
                    onBreakpoint={broken => this.setState({ collapsed: broken })}
                />
                <Layout style={{ minHeight: '100vh' }}>
                    <VerticalMenu title={this.props.pageTitle} collapsed={this.state.collapsed} toggle={this.toggle} />
                    <Content>
                        <div >
                            {this.props.children}
                        </div>
                    </Content>
                    <VerticalFooter />
                </Layout>
            </Layout >
        )
    }
}
export default CourseLayout;