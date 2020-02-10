import React from "react"
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import { message, Popconfirm, Icon } from 'antd';
import SimpleBorderedShadowButton from "components/button/simple-border-shadow";
import { getErrorMessage } from "utils/error-handle";

const SUSPEND_BOOK = gql`
mutation suspendBook($bookId: ID!) {
  suspendBook(bookId: $bookId)
}
`;

class BookSuspendButton extends React.Component {
    state = { loading: false }

    suspendBook = async () => {
        if (this.props.pages.length >= 20) {
            message.error("作成できるページは1セクションにつき20までです", 7)
            return;
        }
        this.setState({ loading: true });
        try {
            await this.props.client.mutate({
                mutation: SUSPEND_BOOK,
                variables: {
                    bookId: this.props.id,
                }
            });

            this.setState({ loading: false });
        } catch (err) {
            message.error(getErrorMessage(err), 7);
            this.setState({ loading: false });
        }
    };

    render() {
        return (
            <Popconfirm
                okText="公開停止する"
                cancelText="キャンセル"
                onConfirm={this.suspendBook}
                title="本当に公開停止しますか？"
                icon={<Icon type="exclamation-circle" style={{ color: 'red' }} />}
            >
                <SimpleBorderedShadowButton
                    text="公開停止する"
                    color="#262626"
                    loading={this.state.loading}
                    style={{ marginRight: '10px' }}
                />
            </Popconfirm>
        )
    }
}

export default withApollo(BookSuspendButton)