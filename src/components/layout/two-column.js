import React from "react"
import { Row, Col } from 'antd';

const TwoColumnLayout = ({ left, right }) => {
    return (
        <div style={{ maxWidth: '100%', width: "1250px", margin: 'auto', position: 'relative', padding: '30px 20px 0px 20px' }}>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                    {left}
                </Col>
                <Col xs={0} sm={0} md={6} lg={6} xl={6}>
                    {right}
                </Col >
            </Row>
        </div>
    )
}

export default TwoColumnLayout