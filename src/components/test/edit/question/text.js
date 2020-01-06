import React from 'react';
import { connect } from 'react-redux'
import { updateTextAnswerShowCount, updateTextAnswer } from 'modules/test/edit/question'
import { Form, Input, Checkbox } from 'antd';

class TextFormComponent extends React.Component {
    render() {
        return (
            <>
                <Form.Item
                    label={<span>答え</span>}
                    validateStatus={this.props.error.status}
                    help={this.props.error.message}
                >
                    <Input
                        placeholder="答えを入力してください"
                        value={this.props.text}
                        onChange={(e) => this.props.updateText(e.target.value)}
                    />
                </Form.Item>
                <Checkbox
                    value={this.props.showCount}
                    onChange={(e) => this.props.updateShowCount(e.target.checked)}
                > ヒントとして、文字数を表示する</Checkbox>
            </>
        );
    }
}

const mapStateToProps = state => ({
    text: state.testEditQuestion.answer.text.text,
    showCount: state.testEditQuestion.answer.text.showCount,
    error: state.testEditQuestion.answer.text.error,
})

const mapDispatchToProps = dispatch => ({
    updateText: (text) => dispatch(updateTextAnswer(text)),
    updateShowCount: (showCount) => dispatch(updateTextAnswerShowCount(showCount)),
})

const TextForm = connect(mapStateToProps, mapDispatchToProps)(TextFormComponent)
export default TextForm