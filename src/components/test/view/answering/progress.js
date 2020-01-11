import React from "react"
import { connect } from 'react-redux'
import { Affix, Progress, Row, Col } from 'antd';
import { prevQuestion, nextQuestion } from "modules/test/view/answer"
import ProgressButton from 'components/test/view/answering/progress-button'
import BlockedProgressButton from 'components/test/view/answering/block-progress-button'
import CompleteButton from "./complete-button";

const TestProgressComponent = (props) => {
    if (props.mode !== 'answering') return <></>;

    const progressVal = Math.floor(props.answers.length * 100 / props.questions.length);

    return (
        <Affix offsetBottom={0} style={{ width: '100%' }}>
            <div style={{
                background: 'white', width: '100%',
                boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
            }}>
                <div style={{ padding: '20px', margin: '0 auto', textAlign: 'center', maxWidth: '740px', width: '100%' }}>
                    <Row type="flex" align="middle" justify="space-around">
                        <Col xs={0} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <CompleteButton currentIdx={props.currentIdx} questions={props.questions} />
                            <Row type="flex" align="middle" justify="space-around">
                                <Col xs={0} sm={14} md={14} lg={14} xl={14} xxl={14}>
                                    <Progress percent={progressVal} />
                                </Col>
                                <Col xs={0} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                    <ProgressButton
                                        prevQuestion={props.prevQuestion}
                                        nextQuestion={props.nextQuestion}
                                        currentIdx={props.currentIdx}
                                        questions={props.questions}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} sm={0} md={0} lg={0} xl={0} xxl={0}>
                            <Progress percent={progressVal} />
                        </Col>
                        <Col xs={24} sm={0} md={0} lg={0} xl={0} xxl={0}>
                            <div style={{ marginTop: '12px' }}>
                                <BlockedProgressButton
                                    prevQuestion={props.prevQuestion}
                                    nextQuestion={props.nextQuestion}
                                    currentIdx={props.currentIdx}
                                    questions={props.questions}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Affix>
    )
}

const mapStateToProps = state => ({
    mode: state.testAnswer.mode,
    currentIdx: state.testAnswer.currentIdx,
    answers: state.testAnswer.answers,
    questions: state.testAnswer.questions,
})

const mapDispatchToProps = dispatch => ({
    prevQuestion: () => dispatch(prevQuestion()),
    nextQuestion: () => dispatch(nextQuestion()),
})

const TestProgress = connect(mapStateToProps, mapDispatchToProps)(TestProgressComponent)

export default TestProgress