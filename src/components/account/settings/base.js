import React from "react"
import { Skeleton, Form, Input, Tooltip, message, Button } from 'antd';
import AvatarUploader from "./avatar-uploader";
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { updateUser } from "services/local-user";
import ErrorResult from "components/error/result";
import { QuestionCircleOutlined, LinkOutlined, TwitterOutlined, GithubOutlined } from "@ant-design/icons";

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
            githubId
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
        loading: false,
    }

    update = async (values) => {
        this.setState({ loading: true });
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
                        githubId: values.githubId ? values.githubId : "",
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
                            <Form
                                {...layout}
                                initialValues={{
                                    displayName: userData.displayName,
                                    profile: userData.description,
                                    url: userData.url,
                                    twitterId: userData.twitterId,
                                    githubId: userData.githubId,
                                }}
                                onFinish={this.update}
                            >
                                <AvatarUploader imageUrl={userData.imageUrl} displayName={userData.displayName} onComplete={(imageUrl) => { this.setState({ imageUrl: imageUrl }) }} />
                                <Form.Item
                                    name="displayName"
                                    label={<DisplayNameLabel />}
                                    rules={[
                                        { required: true, message: '表示名を入力してください', whitespace: true },
                                        { max: 30, message: '最大文字数は30文字です', whitespace: true }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="profile"
                                    label={<ProfileLabel />}
                                    rules={[{ max: 200, message: '最大文字数は200文字です', whitespace: true }]}
                                >
                                    <Input.TextArea autoSize={{ minRows: 3, maxRows: 7 }} />
                                </Form.Item>
                                <Form.Item name="url" label={<WebSiteLabel />}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="twitterId" label={<TwitterLabel />}>
                                    <Input addonBefore="https://twitter.com/" />
                                </Form.Item>
                                <Form.Item name="githubId" label={<GitHubLabel />}>
                                    <Input addonBefore="https://github.com/" />
                                </Form.Item>
                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit" loading={this.state.loading} size="large" >
                                        更新する
                                    </Button>
                                </Form.Item>
                            </Form >
                        </div>
                    )
                }}
            </Query >
        )
    }
}
export default withApollo(UpdateForm)

const DisplayNameLabel = () => {
    return (
        <span>
            表示名&nbsp;
            <Tooltip title="30文字まで入力できます">
                <QuestionCircleOutlined />
            </Tooltip>
        </span>
    )
}

const ProfileLabel = () => {
    return (
        <span>
            自己紹介&nbsp;
            <Tooltip title="200文字まで入力できます">
                <QuestionCircleOutlined />
            </Tooltip>
        </span>

    )
}

const WebSiteLabel = () => {
    return (
        <span>
            <LinkOutlined style={{ marginRight: '8px' }} />
            WebサイトURL&nbsp;
        </span>
    )
}

const TwitterLabel = () => {
    return (
        <span>
            <TwitterOutlined style={{ marginRight: '8px' }} />
            Twitter ID&nbsp;
        </span>
    )
}

const GitHubLabel = () => {
    return (
        <span>
            <GithubOutlined style={{ color: 'black', marginRight: '8px' }} />
            Github ID&nbsp;
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