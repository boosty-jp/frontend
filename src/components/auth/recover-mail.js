import React from 'react'
import { message, Result, Button, Spin } from 'antd';
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

export default class RecoverMail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            complete: false,
        }
    }
    componentDidMount() {
        var restoredEmail = null;
        this.props.auth.checkActionCode(this.props.actionCode).then((info) => {
            restoredEmail = info['data']['email'];

            return this.props.auth.applyActionCode(this.props.actionCode);
        }).then(() => {
            this.props.auth.sendPasswordResetEmail(restoredEmail).then(() => {
                this.setState({ loading: false, error: false, complete: true });
                message.info('メールアドレスを復元しました。', 7)
            }).catch(function (error) {
                this.setState({ loading: false, error: true, complete: false });
                message.error('エラーが発生しました。', 7)
            });
        }).catch(e => {
            this.setState({ loading: false, error: true, complete: false });
            message.error('エラーが発生しました。', 7)
        });
    }

    render() {
        var content = <></>
        if (this.state.error) {
            content =
                <Result
                    status="error"
                    title="「期限切れ」または「無効」です"
                />
        } else if (this.state.complete) {
            content =
                <Result
                    status="success"
                    title="メールアドレスを復元いたしました。"
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