import React from "react"
import { InputNumber, Skeleton, Form, Input, Tooltip, Icon, message } from 'antd';
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
                    if (loading) return <Skeleton active paragraph={{ rows: 6 }} />
                    if (error) return <ErrorResult />
                    const userData = data.account.user
                    return (
                        <div style={{ width: '100%' }}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Item
                                    label={
                                        <span>
                                            タイトル&nbsp;
                                            <Tooltip title="60文字まで入力できます">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('displayName', {
                                        rules: [
                                            { required: true, message: 'タイトルを入力してください', whitespace: true },
                                            { max: 60, message: 'タイトルは60文字です', whitespace: true },
                                        ],
                                        initialValue: userData.displayName,
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item label={
                                    <span>
                                        説明文&nbsp;
                                        <Tooltip title="500文字まで入力できます">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </span>
                                }>
                                    {getFieldDecorator('profile', {
                                        rules: [
                                            { required: true, message: '説明文を入力してください', whitespace: true },
                                            { min: 50, message: '50文字以上入力してください', whitespace: true },
                                            { max: 500, message: '最大文字数は500文字です', whitespace: true },
                                        ],
                                        initialValue: userData.description,
                                    })(
                                        <Input.TextArea
                                            autoSize={{ minRows: 5, maxRows: 12 }}
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item label={
                                    <span>
                                        価格&nbsp;
                                        <Tooltip title="50000円まで入力できます">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </span>
                                }>
                                    {getFieldDecorator('price', {
                                        rules: [
                                            { required: true, message: '価格を入力してください', whitespace: true },
                                            { min: 0, message: '0円以上にしてください', whitespace: true },
                                            { max: 50000, message: '設定できる最大価格は50000円です', whitespace: true },
                                        ],
                                        initialValue: 0,
                                    })(<><InputNumber min={0} max={50000} step={100} defaultValue={0} /><span style={{ marginLeft: '8px' }}>円</span></>)}
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

const BookBaseUpdateForm = Form.create({ name: 'update' })(UpdateForm);
export default withApollo(BookBaseUpdateForm)