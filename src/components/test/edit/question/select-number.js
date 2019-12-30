import React from 'react';
import { Form, InputNumber } from 'antd';

function validatePrimeNumber(number) {
    if (number > 1 && number < 6) {
        return {
            validateStatus: 'success',
            errorMsg: null,
        };
    }
    return {
        validateStatus: 'error',
        errorMsg: '2〜5の間で設定できます。',
    };
}

export default class SelectNumberForm extends React.Component {
    state = {
        number: {
            value: 4,
        },
    };

    handleNumberChange = value => {
        this.setState({
            number: {
                ...validatePrimeNumber(value),
                value,
            },
        });
    };

    render() {
        const { number } = this.state;
        return (
            <Form.Item
                label="選択肢の数"
                validateStatus={number.validateStatus}
                help={number.errorMsg}
            >
                <InputNumber min={2} max={5} value={number.value} onChange={this.handleNumberChange} />
            </Form.Item>
        );
    }
}