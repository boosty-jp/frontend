import React from 'react';
import { Form, Radio } from 'antd';

export default class BooleanForm extends React.Component {
    render() {
        return (
            <Form.Item label={<span>答え</span>}>
                <Radio.Group defaultValue="true" buttonStyle="solid">
                    <Radio.Button value="true">○</Radio.Button>
                    <Radio.Button value="false">✗</Radio.Button>
                </Radio.Group>
            </Form.Item>
        );
    }
}
