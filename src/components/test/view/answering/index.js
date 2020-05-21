import React from "react"
import { Row, Col } from 'antd';
import QuestionCard from 'components/test/view/answering/question-card'

const commonStyle = {
    background: '#fff',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '0.5rem',
    padding: '24px',
}

const AnsweringComponent = () => {
    return (
        <Row>
            <Col xs={0} sm={0} md={24} lg={24} xl={24} xxl={24}>
                <div style={{
                    ...commonStyle,
                    margin: '20px auto',
                    maxWidth: '740px',
                }}>
                    <QuestionCard />
                </div>
            </Col>
            <Col xs={24} sm={24} md={0} lg={0} xl={0} xxl={0}>
                <div style={{
                    ...commonStyle,
                    margin: '20px',
                }}>
                    <QuestionCard />
                </div>
            </Col>
        </Row>
    )
}
export default AnsweringComponent;