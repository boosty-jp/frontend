import React from "react"
import { Skeleton, Form, Input, Tooltip, Icon, message } from 'antd';
import AvatarUploader from "./avatar-uploader";
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { updateUser } from "services/local-user";
import ErrorResult from "components/error/result";
import SimpleShadowButton from "components/button/simple-shadow";

const GET_ACCOUNT = gql`
  query GetAccount {
    account {
        user{
            id
            displayName
            description
            url
            imageUrl
            twitterId
            facebookId
        }
    }
}
`;

const UPDATE_USER = gql`
mutation UpdateUser($userInput: UserInput!){
  updateUser(user: $userInput)
}
`;

class UpdateForm extends React.Component {
    state = {
        loading: false
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ loading: true });
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.update(values);
            }
        });
    };


    update = async (values) => {
        try {
            await this.props.client.mutate({
                mutation: UPDATE_USER,
                variables: {
                    userInput: {
                        url: values.url ? values.url : "",
                        imageUrl: this.state.imageUrl ? this.state.imageUrl : "",
                        description: values.profile ? values.profile : "",
                        displayName: values.displayName ? values.displayName : "",
                        twitterId: values.twitterId ? values.twitterId : "",
                        facebookId: values.facebookId ? values.facebookId : "",
                    }
                }
            });
            updateUser({
                imageUrl: this.state.imageUrl ? this.state.imageUrl : "",
                userName: values.displayName ? values.displayName : ""
            })
            message.success("プロフィールを更新しました", 7)
        } catch (err) {
            message.error("エラーが発生しました。お手数ですが、再度お試しください", 7)
        }

        this.setState({ loading: false })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Query
                query={GET_ACCOUNT}
                onCompleted={(data) => this.setState({ imageUrl: data.account.user.imageUrl })}
            >
                {({ loading, error, data }) => {
                    if (loading) return <Skeleton avatar active paragraph={{ rows: 10 }} />
                    if (error) return <ErrorResult />
                    const userData = data.account.user
                    return (
                        <div style={{ width: '100%' }}>
                            <Form onSubmit={this.handleSubmit}>
                                <AvatarUploader imageUrl={userData.imageUrl} displayName={userData.displayName} onComplete={(imageUrl) => { this.setState({ imageUrl: imageUrl }) }} />
                                <Form.Item
                                    label={
                                        <span>
                                            表示名&nbsp;
                                            <Tooltip title="30文字まで入力できます">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('displayName', {
                                        rules: [
                                            { required: true, message: '表示名を入力してください', whitespace: true },
                                            { max: 30, message: '最大文字数は30文字です', whitespace: true },
                                        ],
                                        initialValue: userData.displayName,
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item label={
                                    <span>
                                        自己紹介&nbsp;
                                        <Tooltip title="200文字まで入力できます">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </span>
                                }>
                                    {getFieldDecorator('profile', {
                                        // rules: [{ required: true, message: 'Please input website!' }],
                                        rules: [
                                            { max: 200, message: '最大文字数は200文字です', whitespace: true },
                                        ],
                                        initialValue: userData.description,
                                    })(
                                        <Input.TextArea
                                            autoSize={{ minRows: 3, maxRows: 7 }}
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item label={
                                    <span>
                                        <Icon type="link" style={{ marginRight: '8px' }} />
                                        WebサイトURL&nbsp;
                                    </span>
                                }>
                                    {getFieldDecorator('url', {
                                        initialValue: userData.url,
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item label={
                                    <span>
                                        <Icon type="twitter" style={{ marginRight: '8px' }} />
                                        Twitter ID&nbsp;
                                    </span>
                                }>
                                    {getFieldDecorator('twitterId', {
                                        initialValue: userData.twitterId,
                                    })(<Input addonBefore="https://twitter.com/" />)}
                                </Form.Item>
                                <Form.Item label={
                                    <span>
                                        <Icon type="facebook" theme="filled" style={{ marginRight: '8px' }} />
                                        Facebook ID&nbsp;
                                    </span>
                                }>
                                    {getFieldDecorator('facebookId', {
                                        initialValue: userData.facebookId,
                                    })(<Input addonBefore="https://facebook.com/" />)}
                                </Form.Item>
                                <Form.Item style={{ textAlign: 'center' }}>
                                    <SimpleShadowButton text="更新する" htmlType="submit" loading={this.state.loading} size="large" />
                                </Form.Item>
                            </Form >
                        </div>
                    )
                }}
            </Query >
        )
    }
}

const ProfileBaseUpdateForm = Form.create({ name: 'update' })(UpdateForm);
export default withApollo(ProfileBaseUpdateForm)