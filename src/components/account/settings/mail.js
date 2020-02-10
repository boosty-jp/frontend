import React from "react"
import { Form, Input, Button, Icon, Modal, message, Spin } from 'antd';
import getFirebase from 'utils/firebase'
import ReAuthForm from "components/auth/reauth/reauth-form";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

class UpdateForm extends React.Component {

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

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.change(values.mail);
            }
        });
    };

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

    change = (mail) => {
        const firebase = getFirebase();
        this.setState({ updating: true });
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                user.updateEmail(mail).then(() => {
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
        const { getFieldDecorator } = this.props.form;

        return (
            <div style={{ maxWidth: '500px', width: '100%' }}>
                <Spin
                    tip="ロード中です"
                    spinning={this.state.loading}
                    indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}
                >
                    <div style={{ fontWeight: '500', fontSize: '14px', marginBottom: '30px' }}>
                        <p><Icon type="mail" style={{ marginRight: '8px' }} />現在のメールアドレス</p>
                        <p>{this.state.currentMail}</p>
                    </div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item label='新しいメールアドレス'>
                            {getFieldDecorator('mail', {
                                rules: [
                                    { required: true, message: 'メールアドレスを入力してください', whitespace: true },
                                ],
                            })(<Input
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="メールアドレス"
                                size="large"
                            />)}
                        </Form.Item>
                        <Form.Item >
                            <Button
                                loading={this.state.updating}
                                type="primary"
                                htmlType="submit"
                            >
                                更新する
                            </Button>
                        </Form.Item>
                    </Form >
                    <Modal
                        title={<><Icon type="warning" theme="twoTone" twoToneColor="#FFCC00" style={{ marginRight: '8px' }} />メールアドレス変更には認証が必要です</>}
                        visible={this.state.needReAuth}
                        onCancel={() => this.setState({ needReAuth: false })}
                        footer={null}
                    >
                        <ReAuthForm onSuccess={() => { this.handleSubmit(); }} />
                    </Modal>
                </Spin>
            </div>
        );
    }
}

const MailUpdateForm = Form.create({ name: 'mail-update' })(UpdateForm);
export default MailUpdateForm