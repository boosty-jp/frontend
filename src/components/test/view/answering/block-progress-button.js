import React from "react"
import { Button, Row, Col, Icon } from 'antd';
import CompleteButton from 'components/test/view/answering/complete-button'

const BlockedProgressButton = ({ prevQuestion, nextQuestion, currentIdx, questions }) => {
    return (
        <>
            <CompleteButton currentIdx={currentIdx} questions={questions} />
            <Row type="flex" align="middle" justify="space-around" gutter={24}>
                <Col span={12}>
                    <Button
                        ghost
                        block
                        type="primary"
                        shape="round"
                        onClick={prevQuestion}
                        disabled={currentIdx === 0}
                        style={{ marginRight: 16, boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)', }}
                    >
                        <Icon type="left" />前へ
                                </Button>
                </Col>
                <Col span={12}>
                    <Button
                        ghost
                        block
                        type="primary"
                        shape="round"
                        onClick={nextQuestion}
                        disabled={currentIdx === questions.length}
                        style={{ boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)', }}
                    >次へ<Icon type="right" />
                    </Button >
                </Col>
            </Row>
        </>
    )
}

export default BlockedProgressButton