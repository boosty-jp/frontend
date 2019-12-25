import React from "react"
import { Form, Button, Tooltip, Icon, message, Spin, Switch, Result } from 'antd';
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'

const GET_SETTINGS = gql`
  query GetSettings {
    account {
        setting {
            skillPublic
            learnPublic
            likePublic
        }
    }
}
`;

const UPDATE_USER_SETTING = gql`
mutation UpdateUserSetting($userSetting: UserSettingInput!){
  updateUserSetting(setting: $userSetting)
}
`;

const ErrorResult = () => {
    return (
        <Result
            status="error"
            title="エラーが発生しました"
            extra={
                <Button type="primary" key="console" onClick={() => window.location.reload()} >リロードする</ Button>
            }
        />
    )
}

class PublicForm extends React.Component {
    state = {
        loading: false,
        settings: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ loading: true });
        this.props.form.validateFieldsAndScroll((err, values) => {
            let skillPublic = values.skillPublic;
            let learnPublic = values.learnPublic;
            let likePublic = values.likePublic;

            if (typeof values.skillPublic === 'undefined') {
                skillPublic = this.state.settings.skillPublic;
            }
            if (typeof values.learnPublic === 'undefined') {
                learnPublic = this.state.settings.learnPublic;
            }
            if (typeof values.likePublic === 'undefined') {
                likePublic = this.state.settings.likePublic;
            }
            this.update(skillPublic, learnPublic, likePublic);
        });
    };

    update = async (skillPublic, learnPublic, likePublic) => {
        try {
            await this.props.client.mutate({
                mutation: UPDATE_USER_SETTING,
                variables: { userSetting: { skillPublic, learnPublic, likePublic } }
            });
            message.success("公開設定を更新しました", 7)
        } catch (err) {
            message.error("エラーが発生しました。お手数ですが、再度お試しください", 7)
        }

        this.setState({ loading: false })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div style={{ maxWidth: '500px', width: '100%' }}>

                <Query
                    query={GET_SETTINGS}
                    onCompleted={(data) => this.setState({ settings: data.account.setting })}
                >
                    {({ loading, error, data }) => {
                        if (loading) {
                            return (
                                <div style={{ margin: 'auto auto', padding: '20px' }}>
                                    <Spin tip="ロード中です" spinning={loading} indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
                                </div>
                            )
                        }
                        if (error) return <ErrorResult />
                        return (
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Item label={
                                    <span>
                                        スキル &nbsp;
                            <Tooltip title="スキル一覧が公開されます">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </span>
                                }>
                                    {getFieldDecorator('skillPublic', {
                                        valuePropName: 'checked',
                                        initialValue: data.account.setting.skillPublic,
                                    })(<Switch checkedChildren="公開中" unCheckedChildren="非公開" />)}
                                </Form.Item>
                                <Form.Item label={
                                    <span>
                                        学習履歴 &nbsp;
                            <Tooltip title="学習済みのコンテンツが公開されます">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </span>
                                }>
                                    {getFieldDecorator('learnPublic', {
                                        valuePropName: 'checked',
                                        initialValue: data.account.setting.learnPublic,
                                    })(<Switch checkedChildren="公開中" unCheckedChildren="非公開" />)}
                                </Form.Item>
                                <Form.Item label={
                                    <span>
                                        いいね &nbsp;
                            <Tooltip title="いいねしたコンテンツが公開されます">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </span>
                                }>
                                    {getFieldDecorator('likePublic', {
                                        valuePropName: 'checked',
                                        initialValue: data.account.setting.likePublic,
                                    })(<Switch checkedChildren="公開中" unCheckedChildren="非公開" />)}
                                </Form.Item>
                                <Form.Item >
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={this.state.loading}
                                        style={{ marginTop: '30px' }}
                                    >
                                        更新する
                                </Button>
                                </Form.Item>
                            </Form >
                        )
                    }}
                </Query >
            </div>
        );
    }
}

const UserPublicForm = Form.create({ name: 'password-update' })(PublicForm);
export default withApollo(UserPublicForm)