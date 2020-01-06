import React from 'react';
import { connect } from 'react-redux'
import { Form, Radio } from 'antd';

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    marginBottom: '14px'
};

class SelectForm extends React.Component {
    render() {
        return (
            <Form>
                <Form.Item >
                    <Radio.Group
                        style={{ width: '100%' }}
                        onChange={e => this.props.updateAnswer(e.target.value)}
                    >
                        {this.props.candidates.map((c, idx) => {
                            return (
                                <Radio style={radioStyle} value={idx + 1} key={"candidate-" + idx}>
                                    {c.text}
                                </Radio>
                            )
                        })}
                    </Radio.Group>
                </Form.Item>
            </Form>
        );
    }
}

const mapStateToProps = state => ({
    candidates: state.testEditQuestion.answer.select,
})

const SelectAnswerForm = connect(mapStateToProps)(SelectForm)
export default SelectAnswerForm