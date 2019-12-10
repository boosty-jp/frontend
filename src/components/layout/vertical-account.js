import React from "react"
import { Layout, Menu, Icon, Avatar } from 'antd';
import InvertLogo from "components/logo/invert";
import VerticalMenu from "components/menu/vertical";
import { Link } from "gatsby";
import VerticalFooter from "./vertical-footer";
import AccountSider from "components/sider/account";

const { Content, Sider } = Layout;

class VerticalLayout extends React.Component {
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
                <AccountSider
                    collapsed={this.state.collapsed}
                    onBreakpoint={broken => this.setState({ collapsed: broken })}
                    openedMenu={[this.props.openedMenu]}
                    selectedMenu={[this.props.selectedMenu]}
                />
                <Layout style={{ minHeight: '100vh' }}>
                    <VerticalMenu title={this.props.pageTitle} collapsed={this.state.collapsed} toggle={this.toggle} />
                    <Content >
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
export default VerticalLayout;