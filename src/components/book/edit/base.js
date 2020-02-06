import React from "react"
import { InputNumber, Skeleton, Form, Input, Tooltip, Icon, message } from 'antd';
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import ErrorResult from "components/error/result";
import SimpleShadowButton from "components/button/simple-shadow";

const GET_BOOK_BASE = gql`
  query GetBook($bookId: ID!) {
    book(bookId: $bookId) {
        title
        description
        price
    }
}
`;

const UPDATE_BOOK_BASE = gql`
mutation UpdateBookBase($bookId: ID!, $bookBaseInput: BookBaseInput!){
  updateBookBase(bookId: $bookId, bookBase: $bookBaseInput)
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
            } else {
                this.setState({ loading: false });
            }
        });
    };


    update = async (values) => {
        try {
            await this.props.client.mutate({
                mutation: UPDATE_BOOK_BASE,
                variables: {
                    bookId: this.props.id,
                    bookBaseInput: {
                        title: values.title,
                        description: values.description,
                        price: values.price,
                    }
                }
            });
            message.success("更新しました", 7)
        } catch (err) {
            message.error("エラーが発生しました。お手数ですが、再度お試しください", 7)
        }

        this.setState({ loading: false })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Query
                query={GET_BOOK_BASE}
                variables={{ bookId: this.props.id }}
                onCompleted={(data) => this.setState({ title: data.book.title, description: data.book.description, price: data.book.price })}
            >
                {({ loading, error, data }) => {
                    if (loading) return <Skeleton active paragraph={{ rows: 6 }} />
                    if (error) return <ErrorResult />
                    const bookData = data.book
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
                                    {getFieldDecorator('title', {
                                        rules: [
                                            { required: true, message: 'タイトルを入力してください', whitespace: true },
                                            { max: 60, message: 'タイトルは60文字です', whitespace: true },
                                        ],
                                        initialValue: bookData.title,
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
                                    {getFieldDecorator('description', {
                                        rules: [
                                            { required: true, message: '説明文を入力してください', whitespace: true },
                                            { min: 50, message: '50文字以上入力してください', whitespace: true },
                                            { max: 500, message: '最大文字数は500文字です', whitespace: true },
                                        ],
                                        initialValue: bookData.description,
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
                                        initialValue: bookData.price,
                                    })(<InputNumber min={0} max={50000} step={100} />)}
                                    <span style={{ marginLeft: '8px' }}>円</span>
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