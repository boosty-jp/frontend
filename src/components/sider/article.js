import React from "react"
import { Layout, Icon, Avatar, Button } from 'antd';
import InvertLogo from "components/logo/invert";

const { Sider } = Layout;

const ArticleDetailSider = ({ collapsed, onBreakpoint }) => {
    return (
        <Sider
            breakpoint="sm"
            trigger={null}
            collapsible
            collapsedWidth="0"
            collapsed={collapsed}
            onBreakpoint={() => onBreakpoint()}
        >
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <InvertLogo />
            </div>
            <div style={{ textAlign: 'center' }}>
                <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{ padding: '0.25rem', backgroundColor: 'white', border: '1px solid #dee2e6' }} />
                <p style={{ color: 'white', marginTop: '8px' }}>Tomoki Yamashita</p>
            </div>
            <div style={{ color: 'white', textAlign: 'center' }}>
                <div >
                    <Button style={{ width: '100px' }}><Icon type="heart" /> 991</Button>
                </div>
                <div style={{ marginTop: '8px' }}>
                    <Button style={{ width: '100px' }}><Icon type="check" /> 36</Button>
                </div>
            </div>
        </Sider>
    )
}

export default ArticleDetailSider;