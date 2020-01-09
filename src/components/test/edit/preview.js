import React from "react"
import { connect } from 'react-redux'
import { Button, Modal, Tooltip, Icon } from 'antd';
import { convertToJSX } from "utils/html-converter";
import QuestionConfirm from 'components/test/edit/confirm'

class TestPreviewComponent extends React.Component {
    state = {
        preview: false,
        currentIdx: 0,
    };

    nextQuestion = () => {
        if (this.state.currentIdx >= this.props.questions.length - 1) {
            return;
        }
        this.setState({ currentIdx: this.state.currentIdx + 1 });
    }

    prevQuestion = () => {
        if (this.state.currentIdx <= 0) {
            return;
        }
        this.setState({ currentIdx: this.state.currentIdx - 1 });
    }

    render() {
        return (
            <>
                <Tooltip placement="left" title="プレビュー">
                    <Button shape="circle" icon="eye" onClick={() => this.setState({ preview: true, currentIdx: 0 })} />
                </Tooltip>
                <Modal
                    title={<><span>問題のプレビュー</span><span style={{ marginLeft: '12px' }}>{this.state.currentIdx + 1} / {this.props.questions.length}</span></>}
                    visible={this.state.preview}
                    onCancel={() => this.setState({ preview: false })}
                    footer={
                        <div style={{ textAlign: 'center' }}>
                            <Button
                                style={{ marginRight: 16 }}
                                onClick={this.prevQuestion}
                                disabled={this.state.currentIdx === 0}
                            >
                                <Icon type="left" />前へ
                            </Button>
                            <Button
                                ghost
                                type="primary"
                                onClick={this.nextQuestion}
                                disabled={this.state.currentIdx === this.props.questions.length}
                            >
                                次へ<Icon type="right" />
                            </Button>
                        </div>
                    }
                    width={740}
                    style={{ top: 80 }}
                >
                    <QuestionConfirm
                        type={this.props.questions[this.state.currentIdx].type}
                        selectAnswer={this.props.questions[this.state.currentIdx].answer}
                        textAnswer={this.props.questions[this.state.currentIdx].answer}
                        explanations={this.props.questions[this.state.currentIdx].explanations}
                        question={convertToJSX(this.props.questions[this.state.currentIdx].questionBlocks).text}
                        questionIdx={this.state.currentIdx + 1}
                    />
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => ({
    questions: state.testEditQuestions.questions,
})

const TestPreview = connect(mapStateToProps)(TestPreviewComponent)
export default TestPreview;