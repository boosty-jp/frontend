import React from "react"
import { message, Checkbox, Form, Input, Button } from 'antd';
import getFirebase from 'utils/firebase'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { setUser } from "services/local-user";
import { createTermsUrl } from "utils/link-generator";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { };

const CREATE_USER = gql`
mutation CreateUser($displayName: String!, $imageUrl: String!) {
  createUser(displayName: $displayName, imageUrl: $imageUrl){
      id
  }
}
`;

const shadowButtonStyle = {
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
}

class OwnSignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            loading: false,
            isSignUped: false,
        }
    }

    getTempDisplayName = (mail) => {
        const target = mail.substring(0, mail.indexOf("@"));
        return target;
    }

    signUp = values => {
        const { mail, password } = values;
        this.setState({ loading: true })

        const firebase = getFirebase();

        if (this.state.isSignUped) {
            this.createUser(this.getTempDisplayName(mail), this.state.uid);
        } else {
            try {
                firebase.auth().createUserWithEmailAndPassword(mail, password)
                    .then((result) => {
                        this.setState({ isSignUped: true, uid: result.user.uid })
                        // BEにユーザー作成する
                        this.createUser(this.getTempDisplayName(mail), result.user.uid);
                    })
                    .catch((error) => {
                        this.handleAuthError(error.code);
                    });
            } catch (error) {
                this.handleAuthError(error.code);
            }
        }
    }

    createUser = async (displayName, uid) => {
        try {
            await this.props.client.mutate({
                mutation: CREATE_USER,
                variables: { displayName: displayName, imageUrl: "" }
            });

            setUser({ userId: uid, imageUrl: "", userName: displayName })
            this.mailVerification();
        } catch (err) {
            message.error("エラーが発生しました。お手数ですが、再度お試しください", 7)
        }
        this.setState({ isLoading: false })
    }

    handleAuthError = (errorCode) => {
        this.setState({ loading: false })
        if (errorCode === 'auth/weak-password') {
            message.error("パスワードは6文字以上にしてください", 7)
        } else if (errorCode === 'auth/email-already-in-use') {
            message.error("このメールアドレスはすでに利用されています", 7)
        } else if (errorCode === 'auth/invalid-email') {
            message.error("無効なメールアドレスです", 7)
        } else {
            message.error("エラーが発生しました。お手数ですが、再度お試しください", 7)
        }
    }

    mailVerification = () => {
        const firebase = getFirebase();
        this.setState({ isSignUped: false })
        message.info("会員登録が完了しました", 7)
        firebase.auth().onAuthStateChanged((user) => {
            if (!user.emailVerified) {
                user.sendEmailVerification().then(() => {
                    navigate("/mail-send")
                }).catch((error) => {
                    navigate("/")
                });
            } else {
                navigate("/")
            }
        });
    }

    render() {
        return (
            <Form onFinish={this.signUp} initialValues={{ terms: false }}>
                <Form.Item name="mail" rules={[{ required: true, message: 'メールアドレスを入力してください' }]}>
                    <Input
                        prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="メールアドレス"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'パスワードを入力してください。' },
                        { min: 6, message: '6文字以上を入力してください' },
                    ]}>
                    <Input
                        type="password"
                        placeholder="パスワード"
                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </Form.Item>
                <Form.Item name="terms" valuePropName="checked" rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('利用規約に同意してください'), }]}>
                    <Checkbox><a href={createTermsUrl()} target="_blank" rel="noopener noreferrer">利用規約</a>に同意する</Checkbox>
                </Form.Item>
                <Form.Item style={{ marginBottom: '0px', textAlign: 'center' }}>
                    <Button
                        shape="round"
                        type="primary"
                        htmlType="submit"
                        loading={this.state.loading}
                        className="login-form-button"
                        style={{ width: '100%', ...shadowButtonStyle }}>会員登録
                        </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default withApollo(OwnSignUpForm)