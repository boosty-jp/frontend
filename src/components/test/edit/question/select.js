import React from 'react';
import { connect } from 'react-redux'
import { addSelectAnswerCandiadte, updateSelectAnswerCandiadte, changeSelectAnswer, deleteSelectAnswerCandiadte } from 'modules/test/edit/question'
import { Form, Radio, Input, Button, Icon, Tag, message } from 'antd';

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    marginBottom: '34px'
};

class SelectFormComponent extends React.Component {

    answer = () => {
        let answer = 1;
        this.props.candidates.forEach((c, idx) => {
            if (c.answer) {
                answer = idx + 1;
            }
        })
        return answer;
    }

    render() {
        return (
            <Form.Item
                label={<span>答え</span>}
                validateStatus={this.props.error.status}
                help={this.props.error.message}
            >
                <Radio.Group
                    value={this.answer()}
                    style={{ width: '100%' }}
                    onChange={(e) => this.props.changeAnswer(e.target.value)}
                >
                    {this.props.candidates.map((c, idx) => {
                        return (
                            <Radio style={radioStyle} value={idx + 1} key={"candidate-" + idx}>
                                {c.answer ?
                                    <Tag color="green">正解　</Tag>
                                    :
                                    <Tag color="red">不正解</Tag>
                                }
                                <Form.Item
                                    validateStatus={c.error.status}
                                    help={c.error.message}
                                    style={{ display: 'inline-block', width: '70%', marginLeft: 10 }}
                                >
                                    <Input
                                        placeholder="入力してください"
                                        value={c.text}
                                        onChange={(e) => this.props.updateCandiadte(idx, e.target.value)} />
                                </Form.Item>
                                <Icon
                                    type="delete"
                                    style={{ marginLeft: '12px' }}
                                    onClick={() => {
                                        if (this.props.candidates.length <= 2) {
                                            message.error("選択肢は2つ以上にしてください")
                                            return;
                                        }
                                        this.props.deleteCandiadte(idx)
                                    }}
                                />
                            </Radio>
                        )
                    })}
                </Radio.Group>
                <div style={{ marginTop: '12px' }}>
                    <Button
                        type="dashed"
                        icon="plus"
                        disabled={this.props.candidates.length >= 5}
                        onClick={() => { this.props.addCandiadte() }}
                        style={{ width: '100%' }}
                    >追加する</Button>
                </div>
            </Form.Item>
        );
    }
}

const mapStateToProps = state => ({
    candidates: state.testEditQuestion.answer.select,
    error: state.testEditQuestion.error.answer,
})

const mapDispatchToProps = dispatch => ({
    addCandiadte: (idx) => dispatch(addSelectAnswerCandiadte(idx)),
    updateCandiadte: (idx, text) => dispatch(updateSelectAnswerCandiadte(idx, text)),
    deleteCandiadte: (idx) => dispatch(deleteSelectAnswerCandiadte(idx)),
    changeAnswer: (idx) => dispatch(changeSelectAnswer(idx)),
})

const SelectForm = connect(mapStateToProps, mapDispatchToProps)(SelectFormComponent)
export default SelectForm