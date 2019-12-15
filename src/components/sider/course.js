import React from "react"
import { Layout, Icon, Progress, Button, Affix, Typography } from 'antd';
import InvertLogo from "components/logo/invert";
import CourseMenu from "components/menu/vertical-course";

const { Sider } = Layout;
const { Paragraph } = Typography;

const CourseDetailSider = ({ collapsed, onBreakpoint }) => {
    return (
        <Sider
            breakpoint="sm"
            trigger={null}
            collapsible
            collapsedWidth="0"
            collapsed={collapsed}
            onBreakpoint={() => onBreakpoint()}
            width={280}
        >
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <InvertLogo />
            </div>
            <Paragraph ellipsis style={{ color: 'white', fontSize: '20px', padding: '10px' }} strong>
                React入門編をGatsbyJSで作りながら学ぶ
                </Paragraph>
            <div style={{ textAlign: 'center' }}>
                <Progress
                    type="circle"
                    width={90}
                    percent={75}
                    format={percent => <span style={{ color: 'white' }}>{percent} %</span>}
                />
            </div>
            {collapsed ?
                <>
                    <div style={{ margin: '16px auto', textAlign: 'center' }}>
                        <Button style={{ marginRight: '30px' }}><Icon type="left" />戻る</Button>
                        <Button >進む<Icon type="right" /></Button>
                    </div>
                    <CourseMenu />
                </>
                :
                <Affix offsetTop={20}>
                    <div style={{ margin: '16px auto', textAlign: 'center' }}>
                        <Button style={{ marginRight: '30px' }}><Icon type="left" />戻る</Button>
                        <Button >進む<Icon type="right" /></Button>
                    </div>
                    <CourseMenu />
                </Affix>
            }
        </Sider>
    )
}

export default CourseDetailSider;