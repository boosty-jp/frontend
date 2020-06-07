import React from 'react'
import { Link } from 'gatsby'
import { message, Result, Button, Spin } from 'antd';
import { navigate } from '@reach/router';
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';

export default class VerifyMailInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            alreadyVerified: false,
            complete: false,
        }
    }
    componentDidMount() {
        //メールアドレス確認
        this.props.auth.applyActionCode(this.props.actionCode).then(() => {
            this.setState({ loading: false, error: false, complete: true });
        }).catch(() => {
            var user = this.props.auth.currentUser;
            this.setState({ loading: false, error: true });

            if (user) {
                if (!user.emailVerified) {
                    this.setState({ alreadyVerified: true })
                } else {
                    this.setState({ isLogin: true });
                }
            } else {
                this.setState({ isLogin: false });
            }
        });
    }

    reSendMail = () => {
        var user = this.props.auth.currentUser;

        if (!user.emailVerified) {
            message.error('すでにメール確認済みです。', 7)
            return;
        }

        user.sendEmailVerification().then(function () {
            message.success('確認メールを再送しました。', 7)
        }).catch(function (error) {
            message.error('エラーが発生しました。時間をおいて、お試しください。', 7)
        });
    }

    render() {
        var content = <></>
        if (this.state.error && this.state.isLogin) {
            content =
                <Result
                    status="error"
                    title="「期限切れ」または「無効」です"
                    subTitle="メール確認のURLを送信してください。"
                    extra={[
                        <Button icon="mail" type="primary" onClick={() => this.reSendMail()}>確認用のメールを再送する</Button>
                    ]}
                />
        } else if (this.state.error && !this.state.isLogin) {
            content =
                <Result
                    status="error"
                    title="「期限切れ」または「無効」です"
                    subTitle={<><Link to="/login">ログイン</Link>後に再度メールをご確認ください</>}
                />
        } else if (this.state.alreadyVerified) {
            content =
                <Result
                    status="error"
                    title="すでにメール確認済みです"
                    subTitle={<><Link to="/login">ホーム</Link>へ</>}
                />
        } else if (this.state.complete) {
            content =
                <Result
                    status="success"
                    title="ご登録いただいたメールアドレスを確認いたしました。"
                    extra={[
                        <Button icon={<UserOutlined />} type="primary" onClick={() => navigate('/account/settings/base')}>プロフィールを編集する</Button>
                    ]}
                />
        } else {
            content = <div style={{ height: '200px' }}></div>
        }

        return (
            <Spin
                tip="ロード中です"
                spinning={this.state.loading}
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            >
                {content}
            </Spin>
        )
    }
}