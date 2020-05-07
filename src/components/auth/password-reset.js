import React from 'react'
import { message, Result, Form, Input, Button, Spin } from 'antd';
import { Link } from "gatsby";
import { LockOutlined, LoadingOutlined } from '@ant-design/icons';

class PasswordResetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            invalid: false,
            passwordUpdated: false,
            isUpdating: false,
            email: "",
        }
        this.handleResetPassword = this.handleResetPassword.bind(this);
    }

    componentDidMount() {
        this.setState({ email: 'hoge', loading: false, invalid: false })
        this.props.auth.verifyPasswordResetCode(this.props.actionCode).then((email) => {
            this.setState({ email: email, loading: false, invalid: false })
        }).catch(() => {
            this.setState({ loading: false, invalid: true })
        });
    }

    handleResetPassword = values => {
        this.setState({ isUpdating: true })
        this.props.auth.confirmPasswordReset(this.props.actionCode, values.password).then((response) => {
            this.setState({ passwordUpdated: true, isUpdating: false })
        }).catch((error) => {
            const errorCode = error.code
            this.setState({ isUpdating: false })
            if (errorCode === "auth/expired-action-code" || errorCode === "auth/invalid-action-code") {
                this.setState({ invalid: true })
            } else if (errorCode === "auth/user-disabled") {
                message.error("対象ユーザーのパスワードの再設定は無効になっています。");
            } else if (errorCode === "auth/weak-password") {
                message.error("パスワードは6文字以上にしてください");
            } else if (errorCode === "auth/user-not-found") {
                message.error("対象のユーザーが見つかりません");
            } else {
                message.error("システムエラーが発生しました。再度実施してください。");
            }
        });
    }

    render() {
        var content = <></>;
        if (this.state.invalid) {
            content = (
                <Result
                    status="error"
                    title="「期限切れ」または「無効」です"
                    subTitle={<><Link to="/forget">パスワード再設定ページ</Link>より再度メールを送信してください</>}
                />
            )
        } else if (!this.state.passwordUpdated) {
            content = (
                <Form onFinish={this.handleResetPassword}>
                    <Form.Item
                        name="password"
                        label="新しいパスワード"
                        rules={[
                            { required: true, message: 'パスワードを入力してください。' },
                            { min: 6, message: '6文字以上を入力してください' },
                        ]}>
                        <Input
                            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="新しいパスワード"
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: '0px', textAlign: 'center' }}>
                        <Button loading={this.state.loading} type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>パスワードを変更する</Button>
                    </Form.Item>
                </Form>
            )
        } else {
            content = (
                <Result
                    status="success"
                    title="パスワードを変更しました。"
                    subTitle={<>新しいパスワードで<Link to="/login">ログイン</Link>して、ご利用ください</>}
                />
            )
        }

        return (
            < Spin
                tip="ロード中です"
                spinning={this.state.loading || this.state.isUpdating}
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            >
                {content}
            </Spin>
        )
    }
}

export default PasswordResetForm;