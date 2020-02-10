import React from "react"
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import { message, Popconfirm } from 'antd';
import SimpleBorderedShadowButton from "components/button/simple-border-shadow";
import { getErrorMessage } from "utils/error-handle";

const PUBLISH_BOOK = gql`
mutation publishBook($bookId: ID!) {
  publishBook(bookId: $bookId)
}
`;

class BookPublishButton extends React.Component {
    state = { loading: false }

    publishBook = async () => {
        if (this.props.pages.length >= 20) {
            message.error("作成できるページは1セクションにつき20までです", 7)
            return;
        }
        this.setState({ loading: true });
        try {
            const { data } = await this.props.client.mutate({
                mutation: PUBLISH_BOOK,
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

export default withApollo(BookPublishButton)