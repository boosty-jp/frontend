import React from "react"
import getFirebase from 'utils/firebase'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { message, Form, Input, Button } from 'antd';
import { isLoggedIn, setUser } from "services/local-user";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { };

const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(userId: $userId) {
       imageUrl
       displayName
    }
}
`;

const shadowButtonStyle = {
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    width: '100%',
}

class OwnLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
        if (isLoggedIn()) {
            navigate("/")
        }
    }

    signIn = values => {
        this.setState({ loading: true })

        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(values.mail, values.password)
            .then((result) => {
                this.mailVerification(result.user.uid)
            })
            .catch((error) => {
                this.handleAuthError(error.code);
            });
    }

    mailVerification = (userId) => {
        const firebase = getFirebase();
        firebase.auth().onAuthStateChanged((user) => {
            if (!user.emailVerified) {
                user.sendEmailVerification().then(() => {
                    this.setLoginData(userId).then(() => {
                        navigate("/mail-send")
                    })
                }).catch(() => {
                    message.error("エラーが発生しました。お手数ですが、再度お試しください", 7)
                    this.setState({ loading: false })
                });
            } else {
                this.setLoginData(userId).then(() => {
                    navigate("/");
                    message.info('ログインしました', 5);
                });
            }
        });
    }

    setLoginData = async (userId) => {
        try {
            // このclientはwithAppoloをつかってクラス定義したことで注入されている
            const { data } = await this.props.client.query({
                query: GET_USER,
                variables: { userId: userId }
            });
            setUser({ userId: userId, imageUrl: data.user.imageUrl, userName: data.user.displayName })
        } catch (err) {
            message.error("エラーが発生しました。お手数ですが、再度お試しください", 7)
        }

        this.setState({ loading: false })
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
                <Form.Item name="mail" rules={[
                    { required: true, message: 'メールアドレスを入力してください' },
                    { type: 'email', message: '無効な形式です' }
                ]}>
                    <Input
                        prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="メールアドレス"
                    />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'パスワードを入力してください。' },]}>
                    <Input
                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="パスワード"
                    />
                </Form.Item>
                <Form.Item style={{ marginBottom: '0px', textAlign: 'center' }}>
                    <Button
                        shape="round"
                        type="primary"
                        htmlType="submit"
                        loading={this.state.loading}
                        className="login-form-button"
                        style={shadowButtonStyle}
                    >
                        ログイン
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default withApollo(OwnLoginForm)