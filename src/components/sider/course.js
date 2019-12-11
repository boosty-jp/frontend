import React from "react"
import { Layout, Icon, Progress, Button } from 'antd';
import InvertLogo from "components/logo/invert";

const { Sider } = Layout;

const CourseDetailSider = ({ collapsed, onBreakpoint }) => {
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
                <Progress
                    type="circle"
                    width={90}
                    percent={75}
                    format={percent => <span style={{ color: 'white' }}>{percent} %</span>}
                />
            </div>
            <div style={{ color: 'white', textAlign: 'center', marginTop: '18px' }}>
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

export default CourseDetailSider;