import React from "react"
import { Form, Input, Button, Modal, message, Spin } from 'antd';
import getFirebase from 'utils/firebase'
import ReAuthForm from "components/auth/reauth/reauth-form";
import { LoadingOutlined, WarningOutlined, MailOutlined } from "@ant-design/icons";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

class MailUpdateForm extends React.Component {
    state = {
        needReAuth: false,
        loading: true,
        updating: false,
        currentMail: '',
    };

    componentDidMount() {
        const firebase = getFirebase();
        firebase.auth().getRedirectResult().then((result) => {
            // サードパーティで認証後にリダイレクトしてきたときの処理
            if (result.user) {
                message.warning("再認証が完了しました。再度パスワード変更をおこなってください", 10)
            }
            this.setState({ loading: false })
        }).catch((error) => {
            this.setState({ loading: false })
            this.handleAuthError(error);
        });


        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                navigate('/login');
                message.error("エラーが発生しました。ログインが必要です。", 10)
            } else {
                this.setState({ currentMail: user.email });
            }
        })
    }

    handleAuthError = (error) => {
        const errorCode = error.code;
        this.setState({ updating: false, needReAuth: false });
        if (errorCode === 'auth/account-exists-with-different-credential' || errorCode === 'auth/credential-already-in-use') {
            message.error("別の認証方式でアカウントが登録されています。別のログイン形式からログインしてください。", 7)
        } else if (errorCode === "auth/weak-password") {
            message.error("パスワードは6文字以上にしてください", 7)
        } else if (errorCode === "auth/requires-recent-login") {
            this.setState({ needReAuth: true })
        } else if (errorCode === "auth/invalid-email") {
            message.error("無効なメールアドレスです", 7)
        } else if (errorCode === 'auth/email-already-in-use') {
            message.error("このメールアドレスはすでに利用されています", 7)
        } else {
            message.error("エラーが発生しました。お手数ですが、再度お試しください。", 7)
        }
    }

    change = values => {
        const firebase = getFirebase();
        this.setState({ updating: true, values: values });
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                user.updateEmail(values.mail).then(() => {
                    message.success("メールアドレスを変更しました。", 10)
                    this.mailVerification();
                    this.setState({ updating: false, needReAuth: false });
                }).catch((error) => {
                    this.handleAuthError(error);
                });
            } else {
                navigate('/')
                message.error("エラーが発生しました。ログインが必要です。", 10)
            }
        });
    }

    mailVerification = () => {
        const firebase = getFirebase();
        firebase.auth().onAuthStateChanged((user) => {
            if (!user.emailVerified) {
                user.sendEmailVerification().then(() => {
                    message.info("新しいメールアドレスに確認メールを送りました。メールをご確認ください", 10)
                }).catch(() => {
                });
            }
        });
    }

    render() {
        return (
            <div style={{ maxWidth: '500px', width: '100%' }}>
                <Spin
                    tip="ロード中です"
                    spinning={this.state.loading}
                    indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                >
                    <Form onFinish={this.change} {...layout}>
                        <Form.Item label='現在のメールアドレス'>
                            {this.state.currentMail}
                        </Form.Item>

                        <Form.Item label='新しいメールアドレス' name="mail" rules={[{ required: true, message: 'メールアドレスを入力してください', whitespace: true }]}>
                            <Input
                                size="large"
                                placeholder="メールアドレス"
                                prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" loading={this.state.updating}>更新する</Button>
                        </Form.Item>
                    </Form >
                    <Modal
                        title={<><WarningOutlined theme="twoTone" twoToneColor="#FFCC00" style={{ marginRight: '8px' }} />メールアドレス変更には認証が必要です</>}
                        visible={this.state.needReAuth}
                        onCancel={() => this.setState({ needReAuth: false })}
                        footer={null}
                    >
                        <ReAuthForm onSuccess={() => { this.change(this.state.values); }} />
                    </Modal>
                </Spin>
            </div>
        );
    }
}

export default MailUpdateForm

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};