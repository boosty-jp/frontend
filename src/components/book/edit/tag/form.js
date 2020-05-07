import React from "react"
import { connect } from 'react-redux'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { Form, Tooltip, message, Button } from 'antd';
import BookTagSelectForm from "containers/search/book-tag-form";
import { QuestionCircleOutlined } from "@ant-design/icons";

const UPDATE_BOOK_TAGS = gql`
mutation updateBookTags($bookId: ID!, $tagIds: [ID]!){
  updateBookTags(bookId: $bookId, tagIds: $tagIds)
}
`;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
};

class BookEditTagFormComponent extends React.Component {
    state = { loading: false }

    updateTags = async () => {
        this.setState({ loading: true })
        try {
            await this.props.client.mutate({
                mutation: UPDATE_BOOK_TAGS,
                variables: {
                    bookId: this.props.id,
                    tagIds: this.props.tags.map(t => { return t.id })
                }
            });
            message.success("更新しました", 7)
        } catch (err) {
            message.error("エラーが発生しました。お手数ですが、再度お試しください", 7)
        }

        this.setState({ loading: false })
    }

    render() {
        return (
            <>
                <Form {...layout}>
                    <Form.Item
                        label={
                            <span>タグ&nbsp;
                                <Tooltip title="検索や本のカテゴライズに用いられます。最大5つまで入力できます">
                                    <QuestionCircleOutlined />
                                </Tooltip>
                            </span>}
                        validateStatus={this.props.error.tags.status}
                        help={this.props.error.tags.message}
                    >
                        <BookTagSelectForm />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" onClick={this.updateTags} loading={this.state.loading} >更新する</Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}

const mapStateToProps = state => ({
    tags: state.bookEdit.tags,
    error: state.bookEdit.error,
})

const BookEditTagForm = connect(mapStateToProps)(BookEditTagFormComponent)
export default withApollo(BookEditTagForm)