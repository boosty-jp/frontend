import React from "react"
import getFirebase from 'utils/firebase'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { message, Form, Icon, Input, Button } from 'antd';
import { isLoggedIn, setUser } from "services/local-user";
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

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
        if (isLoggedIn()) {
            navigate("/")
        }
    }

    signIn = (mail, password) => {
        this.setState({ loading: true })

        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(mail, password)
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
            setUser({ userId: userId, imageUrl: "https://i.pravatar.cc/150?img=18", userName: "tomokiya" })
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

const OwnLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default withApollo(OwnLoginForm)