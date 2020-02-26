import React from "react"
import { withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import gql from 'graphql-tag';
import { message, Popconfirm } from 'antd';
import SimpleBorderedShadowButton from "components/button/simple-border-shadow";
import { getErrorMessage } from "utils/error-handle";
import { publish } from 'modules/book/edit'

const PUBLISH_BOOK = gql`
mutation publishBook($bookId: ID!) {
  publishBook(bookId: $bookId)
}
`;

class BookPublishButtonComponent extends React.Component {
    state = { loading: false }

    publishBook = async () => {
        this.setState({ loading: true });
        try {
            await this.props.client.mutate({
                mutation: PUBLISH_BOOK,
                variables: {
                    bookId: this.props.id,
                }
            });

            message.success("公開しました", 7);
            this.props.publish();
            this.setState({ loading: false });
        } catch (err) {
            message.error(getErrorMessage(err), 7);
            this.setState({ loading: false });
        }
    };

    render() {
        return (
            <Popconfirm
                okText="公開する"
                cancelText="キャンセル"
                onConfirm={this.publishBook}
                title="本当に公開しますか？"
            >
                <SimpleBorderedShadowButton
                    text="公開する"
                    color="#1890ff"
                    loading={this.state.loading}
                    style={{ marginRight: '10px' }}
                />
            </Popconfirm>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    publish: () => dispatch(publish()),
})

const BookPublishButton = connect(null, mapDispatchToProps)(BookPublishButtonComponent)
export default withApollo(BookPublishButton)