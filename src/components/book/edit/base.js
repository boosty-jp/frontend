import React from "react"
import { connect } from 'react-redux'
import { InputNumber, Skeleton, Form, Input, Tooltip, Icon, message, Tag } from 'antd';
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
import { setBookData } from 'modules/book/edit'
import { withApollo } from 'react-apollo'
import ErrorResult from "components/error/result";
import SimpleShadowButton from "components/button/simple-shadow";
import { getErrorMessage } from "utils/error-handle";
import { createStripeRegistrationLink } from "utils/link-generator";

const GET_BOOK = gql`
  query GetBook($bookId: ID!) {
    book(bookId: $bookId) {
        id
        title
        imageUrl
        description
        price
        canSale
        features
        targets {
            levelStart
            levelEnd
            targetDescriptions
        }
        status
        tags {
            id
            name
        }
        sections {
            id
            number
            title
            pages {
                id
                number
                title
                canPreview
            }
        }
    }
}
`;

const UPDATE_BOOK_BASE = gql`
mutation UpdateBookBase($bookId: ID!, $bookBaseInput: BookBaseInput!){
  updateBookBase(bookId: $bookId, bookBase: $bookBaseInput)
}
`;

const PriceTypeTag = ({ price }) => {
    if (!price) {
        return (
            <Tag>無料公開</Tag>
        )
    }
    return (
        <Tag color="cyan">有料公開</Tag>
    )
}

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
            message.error(getErrorMessage(err), 7)
        }

        this.setState({ loading: false })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Query
                query={GET_BOOK}
                variables={{ bookId: this.props.id }}
                onCompleted={(data) => {
                    this.setState({ title: data.book.title, description: data.book.description, price: data.book.price });
                    this.props.setBookData(data.book);
                }}
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
                                            autoSize={{ minRows: 6, maxRows: 12 }}
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
                                    })(<InputNumber
                                        min={0}
                                        max={bookData.canSale ? 50000 : 0}
                                        step={100}
                                        onChange={(value) => this.setState({ price: value })}
                                    />)}
                                    <span style={{ marginLeft: '8px', marginRight: '12px' }}>円</span>
                                    <PriceTypeTag price={this.state.price} />
                                    {!bookData.canSale && <p>有料公開するには、<a href={createStripeRegistrationLink()}>手続き</a>が必要です。</p>}
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

const mapDispatchToProps = dispatch => ({
    setBookData: (book) => dispatch(setBookData(book)),
})

const BookBaseUpdateForm = connect(null, mapDispatchToProps)(Form.create({ name: 'update' })(UpdateForm));
export default withApollo(BookBaseUpdateForm)