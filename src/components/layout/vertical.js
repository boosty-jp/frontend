import React from "react"
import { Layout, Menu, Icon, Avatar } from 'antd';
import InvertLogo from "components/logo/invert";
import VerticalMenu from "components/menu/vertical";
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';

const { Content, Sider } = Layout;
const links = [
    {
        key: '帮助',
        title: '帮助',
        href: '',
    },
    {
        key: 'github',
        title: <Icon type="github" />,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
    },
    {
        key: '条款',
        title: '条款',
        href: '',
        blankTarget: true,
    },
];

const copyright = (
    <div>
        Copyright <Icon type="copyright" /> 2017 蚂蚁金服体验技术部出品
  </div>
);

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
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['account-1']}>
                        <Menu.SubMenu
                            key="account"
                            title={
                                <span>
                                    <Icon type="user" />
                                    <span>アカウント</span>
                                </span>
                            }
                        >
                            <Menu.Item key="account-1">プロフィール</Menu.Item>
                            <Menu.Item key="account-2">アカウント設定</Menu.Item>
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
                            <Menu.Item key="study-1">学習中</Menu.Item>
                            <Menu.Item key="study-2">学習完了</Menu.Item>
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
                            <Menu.Item key="contents-1">コンテンツ編集</Menu.Item>
                            <Menu.Item key="contents-2">データ表示</Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ minHeight: '100vh' }}>
                    <VerticalMenu title={this.props.pageTitle} collapsed={this.state.collapsed} toggle={this.toggle} />
                    <Content style={{ overflowY: 'scroll' }}>
                        <div >
                            {this.props.children}
                        </div>
                    </Content>
                    <div style={{ textAlign: 'center', padding: '16px' }}>
                        <GlobalFooter links={links} copyright={copyright} />
                    </div>
                </Layout>
            </Layout >
        )
    }
}
export default VerticalLayout;