import React from "react"
import getFirebase from 'utils/firebase'
import { message, Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined } from "@ant-design/icons";

class OwnReAuthForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    signIn = values => {
        this.setState({ loading: true })

        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(values.mail, values.password)
            .then((credential) => {
                firebase.auth().onAuthStateChanged((user) => {
                    user.reauthenticateWithCredential(credential).then(() => {
                        this.setState({ loading: false })
                        this.props.onSuccess();
                    }).catch((error) => {
                        this.handleAuthError(error.code)
                    });
                });
            })
            .catch((error) => {
                this.handleAuthError(error.code);
            });
    }

    handleAuthError = (errorCode) => {
        this.setState({ loading: false })
        if (errorCode === 'auth/invalid-email'
            || errorCode === "auth/user-not-found"
            || errorCode === "auth/user-disabled") {
            message.error("無効なアカウントです。", 5)
        } else if (errorCode === 'auth/wrong-password') {
            message.error("メールアドレスとパスワードが一致しません", 5)
        } else {
            message.error("エラーが発生しました。お手数ですが、再度お試しください", 5)
        }
    }

    render() {
        return (
            <Form onFinish={this.signIn}>
                <Form.Item label="メールアドレス" name="mail" rules={[{ required: true, message: 'メールアドレスを入力してください' }]}>
                    <Input
                        size="large"
                        placeholder="メールアドレス"
                        prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </Form.Item>
                <Form.Item label="パスワード" name="password" rules={[{ required: true, message: 'パスワードを入力してください。' }]}>
                    <Input
                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="パスワード"
                        size="large"
                    />
                </Form.Item>
                <Form.Item style={{ marginBottom: '0px', textAlign: 'center' }}>
                    <Button loading={this.state.loading} type="primary" htmlType="submit" style={{ width: '100%' }}>再認証する</Button>
                </Form.Item>
            </Form>
        );
    }
}

export default OwnReAuthForm