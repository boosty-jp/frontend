import React from "react"
import getFirebase from 'utils/firebase'
import { Form, Icon, Input, Button, Typography, message } from 'antd';

class ForgetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            sendSuccess: false,
        }
    }

    sendMail = (mail) => {
        this.setState({ loading: true })
        const firebase = getFirebase();
        firebase.auth().sendPasswordResetEmail(mail).then(() => {
            this.setState({ sendSuccess: true, loading: false })
        }).catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/invalid-email" || errorCode === "auth/user-not-found") {
                message.error("無効なメールアドレスです。メールアドレスをご確認ください", 7)
            } else {
                message.error("エラーが発生しました。お手数ですが、再度お試しください", 7)
            }
            this.setState({ sendSuccess: false, loading: false })
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(((err, values) => {
            if (!err) {
                this.sendMail(values.mail);
            }
        }));
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            this.state.sendSuccess ?
                <Typography>
                    <Typography.Paragraph style={{ fontWeight: '500', fontSize: '24px', textAlign: 'center' }}>
                        <Icon type="mail" theme="twoTone" style={{ marginRight: '8px' }} />メールを送信しました。
                    </Typography.Paragraph>
                    <Typography.Paragraph style={{ textAlign: 'center' }}>メールをご確認の上、パスワード変更をおこなってください。</Typography.Paragraph>
                </Typography>
                :
                <>
                    <Typography >
                        <Typography.Paragraph style={{ fontWeight: '500', fontSize: '20px', textAlign: 'center' }}>
                            パスワード変更
                    </Typography.Paragraph>
                        <Typography.Paragraph>対象のアカウントのメールアドレスを入力してください。パスワード変更用のURLを送ります。</Typography.Paragraph>
                    </Typography >
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
                        <Form.Item style={{ marginBottom: '0px', textAlign: 'center' }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                loading={this.state.loading}
                                style={{ width: '100%' }}>
                                パスワード変更メールを送る
                    </Button>
                        </Form.Item>
                    </Form>
                </>
        );
    }
}

const PasswordForgetForm = Form.create({ name: 'forget' })(ForgetForm);

export default PasswordForgetForm;