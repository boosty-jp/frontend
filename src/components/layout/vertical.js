import React from "react"
import { Layout, Menu, Icon, Avatar } from 'antd';
import InvertLogo from "components/logo/invert";
import VerticalMenu from "components/menu/vertical";
import { Link } from "gatsby";
import VerticalFooter from "./vertical-footer";

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
                <Sider
                    breakpoint="sm"
                    trigger={null}
                    collapsible
                    collapsedWidth="0"
                    collapsed={this.state.collapsed}
                    onBreakpoint={broken => this.setState({ collapsed: broken })}
                >
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <InvertLogo />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{ padding: '0.25rem', backgroundColor: 'white', border: '1px solid #dee2e6' }} />
                        <p style={{ color: 'white', marginTop: '8px' }}>Tomoki Yamashita</p>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.props.selectedMenu]}>
                        <Menu.SubMenu
                            key="account"
                            title={
                                <span>
                                    <Icon type="user" />
                                    <span>アカウント</span>
                                </span>
                            }
                        >
                            <Menu.Item key="account-profile">
                                <Link to="account/profile">プロフィール</Link>
                            </Menu.Item>
                            <Menu.Item key="account-settings">
                                <Link to="account/settings/base">アカウント設定</Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu
                            key="study"
                            title={
                                <span>
                                    <Icon type="highlight" />
                                    <span>学習管理</span>
                                </span>
                            }
                        >
                            <Menu.Item key="learning">学習中</Menu.Item>
                            <Menu.Item key="learned">学習完了</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu
                            key="contents"
                            title={
                                <span>
                                    <Icon type="container" />
                                    <span>コンテンツ</span>
                                </span>
                            }
                        >
                            <Menu.Item key="contents-edit">コンテンツ編集</Menu.Item>
                            <Menu.Item key="contents-data">データ表示</Menu.Item>
                            <Menu.Item key="contents-liked">お気にいり</Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Sider>
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