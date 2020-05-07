import React from "react"
import { withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import gql from 'graphql-tag';
import { message, Popconfirm } from 'antd';
import SimpleBorderedShadowButton from "components/button/simple-border-shadow";
import { getErrorMessage } from "utils/error-handle";
import { suspend } from 'modules/book/edit/index'
import { ExclamationCircleOutlined } from "@ant-design/icons";

const SUSPEND_BOOK = gql`
mutation suspendBook($bookId: ID!) {
  suspendBook(bookId: $bookId)
}
`;

class BookSuspendButtonComponent extends React.Component {
    state = { loading: false }

    suspendBook = async () => {
        this.setState({ loading: true });
        try {
            await this.props.client.mutate({
                mutation: SUSPEND_BOOK,
                variables: {
                    bookId: this.props.id,
                }
            });

            this.props.suspend();
            message.success("公開停止しました", 7);
        } catch (err) {
            message.error(getErrorMessage(err), 7);
        }
        this.setState({ loading: false });
    };

    render() {
        return (
            <Popconfirm
                okText="公開停止する"
                cancelText="キャンセル"
                onConfirm={this.suspendBook}
                title="本当に公開停止しますか？"
                icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
            >
                <SimpleBorderedShadowButton
                    text="公開停止する"
                    color="gray"
                    loading={this.state.loading}
                    style={{ marginRight: '10px' }}
                />
            </Popconfirm>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    suspend: () => dispatch(suspend()),
})

const BookSuspendButton = connect(null, mapDispatchToProps)(BookSuspendButtonComponent)
export default withApollo(BookSuspendButton)