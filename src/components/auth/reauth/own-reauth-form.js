import React from "react"
import getFirebase from 'utils/firebase'
import { message, Form, Icon, Input, Button } from 'antd';

class OwnReAuthFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    signIn = (mail, password) => {
        this.setState({ loading: true })

        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(mail, password)
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

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(((err, values) => {
            if (!err) {
                this.signIn(values.mail, values.password);
            }
        }));
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
                    <Button loading={this.state.loading} type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>再認証する</Button>
                </Form.Item>
            </Form>
        );
    }
}

const OwnReAuthForm = Form.create({ name: 'reauth' })(OwnReAuthFormComponent);

export default OwnReAuthForm