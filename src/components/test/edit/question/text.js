import React from 'react';
import { Form, Input, Checkbox } from 'antd';

export default class TextForm extends React.Component {
    render() {
        return (
            <Form.Item label={<span>答え</span>}>
                <Input placeholder="答えを入力してください" />
                <Checkbox onChange={() => { }}>ヒントとして、文字数を表示する</Checkbox>
            </Form.Item>
        );
    }
}
