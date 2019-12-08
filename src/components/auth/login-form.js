import React from "react"
import { Form, Icon, Input, Button, Divider } from 'antd';
import { presetPalettes } from '@ant-design/colors'

import styled from 'styled-components'

const LoginDivider = styled(Divider)`
  .ant-divider-inner-text {
      fontSize: '14px',
  }
`;

class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item label="メールアドレス">
                    {getFieldDecorator('mail', {
                        rules: [{ required: true, message: 'メールアドレスを入力してください' }],
                    })(
                        <Input
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="メールアドレス"
                            size="large"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="パスワード">
                    {getFieldDecorator('password', {
                        rules: [
                            { required: true, message: 'パスワードを入力してください。' },
                        ],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="パスワード"
                            size="large"
                        />,
                    )}
                </Form.Item>
                <Form.Item style={{ marginBottom: '0px', textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>ログイン</Button>
                    <LoginDivider>もしくは</LoginDivider>
                    <Button icon="google" style={{ backgroundColor: presetPalettes.red.primary, borderColor: presetPalettes.red.primary, color: 'white', marginRight: '12px' }} />
                    <Button icon="facebook" style={{ backgroundColor: presetPalettes.blue[7], borderColor: presetPalettes.blue[7], color: 'white', marginRight: '12px' }} />
                    <Button icon="twitter" style={{ backgroundColor: presetPalettes.blue[4], borderColor: presetPalettes.blue[4], color: 'white' }} />
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm