import React from "react"
import getFirebase from 'utils/firebase'
import { Form, Input, Button, Typography, message } from 'antd';
import { MailTwoTone, MailOutlined } from "@ant-design/icons";

const shadowButtonStyle = {
    width: '100%',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
}
class PasswordForgetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            sendSuccess: false,
        }
    }

    sendMail = values => {
        this.setState({ loading: true })
        const firebase = getFirebase();
        firebase.auth().sendPasswordResetEmail(values.mail).then(() => {
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

    render() {
        return (
            this.state.sendSuccess ?
                <Typography>
                    <Typography.Paragraph style={{ fontWeight: '500', fontSize: '24px', textAlign: 'center' }}>
                        <MailTwoTone style={{ marginRight: '8px' }} />メールを送信しました。
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
                    <Form onFinish={this.sendMail}>
                        <Form.Item name="mail" rules={[{ required: true, message: 'メールアドレスを入力してください' }]}>
                            <Input
                                prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="メールアドレス" />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: '0px', textAlign: 'center' }}>
                            <Button
                                shape="round"
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                loading={this.state.loading}
                                style={shadowButtonStyle}>
                                パスワード変更メールを送る
                    </Button>
                        </Form.Item>
                    </Form>
                </>
        );
    }
}

export default PasswordForgetForm;