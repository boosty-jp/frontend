import React from "react"
import { connect } from 'react-redux'
import { InputNumber, Skeleton, Form, Input, Tooltip, message, Tag, Button } from 'antd';
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
import { setBookData } from 'modules/book/edit'
import { withApollo } from 'react-apollo'
import ErrorResult from "components/error/result";
import { getErrorMessage } from "utils/error-handle";
import { createStripeRegistrationLink } from "utils/link-generator";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Link } from "gatsby";

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

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
};

class UpdateForm extends React.Component {
    state = {
        loading: false
    }

    update = async (values) => {
        this.setState({ loading: true });
        try {
            await this.props.client.mutate({
                mutation: UPDATE_BOOK_BASE,
                variables: {
                    bookId: this.props.id,
                    bookBaseInput: {
                        title: values.title,
                        description: values.description,
                        price: this.state.price,
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
                            <Form
                                {...layout}
                                onFinish={this.update}
                                initialValues={{
                                    title: bookData.title,
                                    description: bookData.description,
                                }}
                            >
                                <Form.Item
                                    name="title"
                                    label={<TitleLabel />}
                                    rules={[
                                        { max: 60, message: 'タイトルは60文字です', whitespace: true },
                                        { required: true, message: 'タイトルを入力してください', whitespace: true },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="description"
                                    label={<DescriptionLabel />}
                                    rules={[
                                        { required: true, message: '説明文を入力してください', whitespace: true },
                                        { min: 50, message: '50文字以上入力してください', whitespace: true },
                                        { max: 500, message: '最大文字数は500文字です', whitespace: true },
                                    ]}
                                >
                                    <Input.TextArea autoSize={{ minRows: 6, maxRows: 12 }}
                                    />
                                </Form.Item>
                                <Form.Item label={<PriceLabel />}>
                                    <InputNumber
                                        step={100}
                                        min={0}
                                        max={bookData.canSale ? 50000 : 0}
                                        defaultValue={bookData.price}
                                        onChange={(value) => this.setState({ price: value })}
                                    />
                                    <span style={{ marginLeft: '8px', marginRight: '12px' }}>円</span>
                                    <PriceTypeTag price={this.state.price} />
                                    {!bookData.canSale && <p>有料公開するには、<a href={createStripeRegistrationLink()}>手続き</a>が必要です。</p>}
                                </Form.Item>
                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit" loading={this.state.loading} >更新する</Button>
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

const BookBaseUpdateForm = connect(null, mapDispatchToProps)(UpdateForm);
export default withApollo(BookBaseUpdateForm)

const TitleLabel = () => {
    return (
        <span>
            タイトル&nbsp;
            <Tooltip title="60文字まで入力できます">
                <QuestionCircleOutlined />
            </Tooltip>
        </span>
    )
}

const DescriptionLabel = () => {
    return (
        <span>
            説明文&nbsp;
            <Tooltip title="500文字まで入力できます">
                <QuestionCircleOutlined />
            </Tooltip>
        </span>
    )
}

const PriceLabel = () => {
    return (
        <span>
            価格&nbsp;
            <Tooltip title="50000円まで入力できます">
                <QuestionCircleOutlined />
            </Tooltip>
        </span>

    )
}

const PriceTypeTag = ({ price }) => {
    if (!price) {
        return (
            <Tag>無料公開</Tag>
        )
    }
    return (
        <>
            <Tag color="cyan">有料公開</Tag>
            <Link to="/faq">販売手数料</Link>について
        </>
    )
}