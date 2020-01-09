import React from 'react';
import { Form, Radio } from 'antd';

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    marginBottom: '14px'
};

const SelectAnswerForm = ({ candidates, updateAnswer }) => {
    return (
        <Form>
            <Form.Item >
                <Radio.Group
                    style={{ width: '100%' }}
                    onChange={e => updateAnswer(candidates[e.target.value].text)}
                >
                    {candidates.map((c, idx) => {
                        return (
                            <Radio style={radioStyle} value={idx} key={"candidate-" + idx}>
                                {c.text}
                            </Radio>
                        )
                    })}
                </Radio.Group>
            </Form.Item>
        </Form>
    );
}

export default SelectAnswerForm