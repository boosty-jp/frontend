import React from 'react';
import { Form, Radio, Input, Button, Icon, Tag } from 'antd';

export default class SelectForm extends React.Component {
    state = {
        candidates: [
            { text: '', answer: false },
            { text: '', answer: true },
            { text: '', answer: false },
            { text: '', answer: false },
        ]
    };

    onChange = e => {
        const updatedCandidates = this.state.candidates.map(c => { return { ...c, answer: false } });
        updatedCandidates[e.target.value - 1].answer = true;
        console.log(updatedCandidates);
        this.setState({ candidates: updatedCandidates });
    };

    changeText = (text, idx) => {
        const updatedCandidates = this.state.candidates.concat();
        updatedCandidates[idx].text = text;
        this.setState({ candidates: updatedCandidates });
    }

    addCandiadte = () => {
        if (this.state.candidates.length >= 5) {
            return;
        }
        const updatedCandidates = this.state.candidates.concat();
        updatedCandidates.push({ text: '', answer: false });
        this.setState({ candidates: updatedCandidates });
    }

    deleteCandiadte = (idx) => {
        const updatedCandidates = this.state.candidates.concat();
        const targetIsAnswer = updatedCandidates[idx].answer;
        updatedCandidates.splice(idx, 1);
        if (targetIsAnswer) updatedCandidates[0].answer = true;
        this.setState({ candidates: updatedCandidates });
    }

    answer = () => {
        let answer = 1;
        this.state.candidates.forEach((c, idx) => {
            if (c.answer) {
                answer = idx + 1;
            }
        })
        return answer;
    }

    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
            marginBottom: '14px'
        };
        return (
            <Form.Item label={<span>答え</span>}>
                <Radio.Group onChange={this.onChange} value={this.answer()}>
                    {this.state.candidates.map((c, idx) => {
                        return (
                            <Radio style={radioStyle} value={idx + 1} key={"candidate-" + c.text + idx}>
                                {c.answer ?
                                    <Tag color="green">正解　</Tag>
                                    :
                                    <Tag color="red">不正解</Tag>
                                }
                                <Input
                                    style={{ width: 300, marginLeft: 10 }}
                                    placeholder="入力してください"
                                    value={c.text}
                                    onChange={(e) => this.changeText(e.target.value, idx)} />
                                <Icon type="delete" style={{ marginLeft: '12px' }} onClick={() => this.deleteCandiadte(idx)} />
                            </Radio>
                        )
                    })}
                </Radio.Group>
                <div style={{ marginTop: '12px' }}>
                    <Button
                        type="dashed"
                        icon="plus"
                        disabled={this.state.candidates.length >= 5}
                        onClick={() => { this.addCandiadte() }}
                    >追加する</Button>
                </div>
            </Form.Item>
        );
    }
}
