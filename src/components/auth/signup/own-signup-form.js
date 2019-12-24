import React from "react"
import { message, Checkbox, Form, Icon, Input, Button } from 'antd';
import getFirebase from 'utils/firebase'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { setUser } from "services/local-user";
import { Link } from "gatsby";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { };

const CREATE_USER = gql`
mutation CreateUser($displayName: String!, $imageUrl: String!) {
  createUser(displayName: $displayName, imageUrl: $imageUrl){
      id
  }
}
`;

class NormalSignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            loading: false,
            isSignUped: false,
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.signUp(values.mail, values.password);
            }
        });
    };


    getTempDisplayName = (mail) => {
        const target = mail.substring(0, mail.indexOf("@"));
        return target;
    }

    signUp = (mail, password) => {
        this.setState({ loading: true })

        const firebase = getFirebase();

        if (this.state.isSignUped) {
            this.createUser(this.getTempDisplayName(mail), this.state.uid);
        } else {
            firebase.auth().createUserWithEmailAndPassword(mail, password)
                .then((result) => {
                    this.setState({ isSignUped: true, uid: result.user.uid })
                    // BEにユーザー作成する
                    this.createUser(this.getTempDisplayName(mail), result.user.uid);
                })
                .catch((error) => {
                    this.handleAuthError(error.code);
                });
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
                            { min: 6, message: '6文字以上を入力してください' },
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
                <Form.Item >
                    {getFieldDecorator('terms', {
                        valuePropName: 'checked',
                        initialValue: false,
                        rules: [{
                            required: true,
                            transform: value => (value || undefined),
                            type: 'boolean',
                            message: '利用規約に同意してください',
                        }],
                    })
                        (
                            <Checkbox>
                                <Link to="/terms">利用規約</Link>に同意する
                            </Checkbox>,
                        )}
                </Form.Item>
                <Form.Item style={{ marginBottom: '0px', textAlign: 'center' }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={this.state.loading}
                        className="login-form-button"
                        style={{ width: '100%' }}>会員登録
                        </Button>
                </Form.Item>
            </Form>
        );
    }
}

const OwnSignUpForm = Form.create({ name: 'normal_signup' })(NormalSignUpForm);
export default withApollo(OwnSignUpForm)