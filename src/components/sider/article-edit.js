import React from "react"
import { Layout, Icon, Avatar, Button, Affix } from 'antd';
import InvertLogo from "components/logo/invert";

const { Sider } = Layout;

const ArticleEditSider = ({ collapsed, onBreakpoint }) => {
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
            <Affix offsetTop={10}>
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <div>
                        <Button style={{ width: '140px' }}><Icon type="save" />下書き保存</Button>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <Button type='primary' style={{ width: '140px' }}><Icon type="upload" />公開する</Button>
                    </div>
                </div>
            </Affix>
        </Sider>
    )
}

export default ArticleEditSider;