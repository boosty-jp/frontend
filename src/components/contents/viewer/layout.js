import React, { useState, useEffect, useRef } from "react"
import { Layout, Menu } from 'antd';

const { Content, Sider } = Layout;

class VerticalContents extends React.Component {
    state = { content: 'article' }
    render() {
        var displayItems;
        if (this.state.content === 'article') {
            displayItems = this.props.articleContents
        } else {
            displayItems = this.props.courseContents
        }
        return (
            <>
                <Sider
                    width="180"
                    style={{ background: '#fff' }}
                >
                    <Menu
                        mode="vertical"
                        defaultSelectedKeys={[this.state.content]}
                        style={{ height: '100%' }}
                    >
                        <Menu.Item key="article" onClick={() => this.setState({ content: 'article' })}>
                            記事
                        </Menu.Item>
                        <Menu.Item key="course" onClick={() => this.setState({ content: 'course' })}>
                            コース
                </Menu.Item>
                    </Menu>
                </Sider>
                <Content style={{ padding: '12px', minHeight: 350, height: '100%' }}>
                    {displayItems}
                </Content>
            </>
        )
    }
}

class HorizontalContents extends React.Component {
    state = { content: 'article' }
    render() {
        var displayItems;
        if (this.state.content === 'article') {
            displayItems = this.props.articleContents
        } else {
            displayItems = this.props.courseContents
        }
        return (
            <>
                <Sider
                    width="100%"
                    style={{ background: '#fff' }}
                >
                    <Menu
                        mode="horizontal"
                        defaultSelectedKeys={[this.state.content]}
                        style={{ width: '100%' }}
                    >
                        <Menu.Item key="article" onClick={() => this.setState({ content: 'article' })}>
                            記事
                        </Menu.Item>
                        <Menu.Item key="course" onClick={() => this.setState({ content: 'course' })}>
                            コース
                </Menu.Item>
                    </Menu>
                    <Content style={{ padding: '12px', minHeight: 350 }}>
                        {displayItems}
                    </Content>
                </Sider>
            </>
        )
    }
}

const ContentLayout = ({ articleContents, courseContents }) => {
    const [width, setWidth] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setWidth(ref.current.clientWidth)
    })

    let contents;
    if (width > 600) {
        contents = <VerticalContents articleContents={articleContents} courseContents={courseContents} />;
    } else {
        contents = <HorizontalContents articleContents={articleContents} courseContents={courseContents} />;
    }

    return (
        <div ref={ref} style={{ padding: '20px' }}>
            <Layout style={{ background: '#fff' }}>
                {contents}
            </Layout>
        </div>
    )
}

export default ContentLayout