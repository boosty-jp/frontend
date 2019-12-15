import React from "react"
import { Affix, Button, Row, Col } from 'antd';

const ActionButtons = () => (
    <Affix offsetTop={120} style={{ height: '0px' }}>
        <div style={{ textAlign: 'right', height: '0px', padding: '20px', width: 'calc((100% - 740px) / 2)' }}>
            <p style={{ width: '70px', textAlign: 'left', margin: '0 0 0 auto' }}>
                <Button icon="heart" shape="circle" style={{ color: 'red' }} />
                <span style={{ marginLeft: '8px' }}>120</span>
            </p>
            <p style={{ width: '70px', textAlign: 'left', margin: '8px 0 0 auto' }}>
                <Button icon="check" shape="circle" style={{ color: 'green' }} />
                <span style={{ marginLeft: '8px' }}>88</span>
            </p>
            <p style={{ width: '70px', textAlign: 'left', margin: '8px 0 0 auto' }}>
                <Button icon="twitter" shape="circle" />
            </p>
        </div>
    </Affix>
)

const ActionButtonSider = ({ onCourse }) => {
    return (
        <Row >
            {onCourse ?
                <Col xs={0} sm={0} md={0} lg={0} xl={24} xxl={24}>
                    <ActionButtons />
                </Col>
                :
                <Col xs={0} sm={0} md={0} lg={24} xl={24} xxl={24}>
                    <ActionButtons />
                </Col>
            }
        </Row>
    )
}

export default ActionButtonSider