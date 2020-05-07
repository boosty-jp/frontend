import React from "react"
import { Form, Input, Button, Tooltip, Modal, message, Spin } from 'antd';
import getFirebase from 'utils/firebase'
import ReAuthForm from "components/auth/reauth/reauth-form";
import { LoadingOutlined, WarningTwoTone, QuestionCircleOutlined, LockOutlined } from "@ant-design/icons";

class PasswordUpdateForm extends React.Component {
    state = {
        needReAuth: false,
        loading: true,
        updating: false,
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
    }

    handleAuthError = (error) => {
        const errorCode = error.code;
        this.setState({ updating: false, needReAuth: false });
        if (errorCode === 'auth/account-exists-with-different-credential' || errorCode === 'auth/email-already-in-use' || errorCode === 'auth/credential-already-in-use') {
            // すでにそのメールでアカウントが作成されていた場合
            message.error("別の認証方式でアカウントが登録されています。別のログイン形式からログインしてください。", 7)
        } else if (errorCode === "auth/weak-password") {
            message.error("パスワードは6文字以上にしてください", 7)
        } else if (errorCode === "auth/requires-recent-login") {
            this.setState({ needReAuth: true })
        } else {
            message.error("エラーが発生しました。お手数ですが、再度お試しください。", 7)
        }
    }

    change = values => {
        this.setState({ updating: true });
        const firebase = getFirebase();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                user.updatePassword(values.password).then(() => {
                    message.success('パスワードを変更しました', 7)
                    this.setState({ updating: false, needReAuth: false });
                }).catch((error) => {
                    this.handleAuthError(error);
                });
            } else {
                message.error("エラーが発生しました。お手数ですが、再度お試しください。", 7)
                this.setState({ needReAuth: false, updating: false })
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
                    <Form onFinish={this.handleSubmit} {...layout}>
                        <Form.Item
                            name="password"
                            label={<PasswordLabel />}
                            rules={[
                                { required: true, message: 'パスワードを入力してください', whitespace: true },
                                { min: 6, message: '6文字以上を入力してください' },
                            ]}
                        >
                            <Input
                                size="large"
                                type="password"
                                placeholder="パスワード"
                                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button loading={this.state.updating} type="primary" htmlType="submit">更新する</Button>
                        </Form.Item>
                    </Form >
                    <Modal
                        footer={null}
                        visible={this.state.needReAuth}
                        onCancel={() => this.setState({ needReAuth: false })}
                        title={<><WarningTwoTone twoToneColor="#FFCC00" style={{ marginRight: '8px' }} />パスワード変更には認証が必要です</>}
                    >
                        <ReAuthForm onSuccess={() => { this.handleSubmit(); }} />
                    </Modal>
                </Spin>
            </div>
        );
    }
}

export default PasswordUpdateForm

const PasswordLabel = () => {
    return (
        <span>
            新しいパスワード &nbsp;
            <Tooltip title="6文字以上にしてください">
                <QuestionCircleOutlined />
            </Tooltip>
        </span>

    )
}

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const tailLayout = {
    wrapperCol: { offset: 6, span: 18 },
};