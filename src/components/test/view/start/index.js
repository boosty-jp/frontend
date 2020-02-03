import React from "react"
import { Row, Col } from 'antd';
import PcTestStartCard from "./pc";
import MobileTestStartCard from "./mobile";

const TestStartCard = () => {
    return (
        <Row>
            <Col xs={0} sm={0} md={24} lg={24} xl={24} xxl={24}>
                <PcTestStartCard />
            </Col>
            <Col xs={24} sm={24} md={0} lg={0} xl={0} xxl={0}>
                <MobileTestStartCard />
            </Col>
        </Row>
    )
}

export default TestStartCard;