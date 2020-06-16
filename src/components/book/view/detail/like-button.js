import React from 'react';
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import { connect } from 'react-redux'
import { Button } from 'antd';
import { HeartTwoTone, HeartOutlined } from '@ant-design/icons';
import { likeBook, unLikeBook } from 'modules/book/view'

const LIKE_BOOK = gql`
mutation likeBook($bookId: ID!) {
  likeBook(bookId: $bookId)
}
`;

const UNLIKE_BOOK = gql`
mutation unLikeBook($bookId: ID!) {
  unLikeBook(bookId: $bookId)
}
`;

class BookLikeButtonComponent extends React.Component {
    state = { loading: false }

    likeBook = async () => {
        this.setState({ loading: true });
        try {
            await this.props.client.mutate({
                mutation: LIKE_BOOK,
                variables: {
                    bookId: this.props.id,
                }
            });

            this.props.like();
            this.setState({ loading: false });
        } catch (err) {
            this.setState({ loading: false });
        }
    };

    unLikeBook = async () => {
        this.setState({ loading: true });
        try {
            await this.props.client.mutate({
                mutation: UNLIKE_BOOK,
                variables: {
                    bookId: this.props.id,
                }
            });

            this.props.unLike();
            this.setState({ loading: false });
        } catch (err) {
            this.setState({ loading: false });
        }
    };

    toggleLike = () => {
        if (!this.props.liked) {
            this.likeBook();
        } else {
            this.unLikeBook();
        }
    }

    render() {
        const icon = this.props.liked ? <HeartTwoTone twoToneColor="#ff7875" style={{ fontSize: '20px' }} /> : <HeartOutlined style={{ fontSize: '20px' }} />;
        const borderColor = this.props.liked ? "#ff7875" : "#d9d9d9";
        const color = this.props.liked ? "#ff7875" : "rgba(0, 0, 0, 0.65)";
        return (
            <>
                <Button
                    icon={icon}
                    shape="circle"
                    size="large"
                    loading={this.state.loading}
                    style={{ marginRight: '8px', borderColor, color, ...this.props.style, verticalAlign: 'bottom' }}
                    onClick={this.toggleLike}
                />
                <span>{this.props.likedCount}</span>
            </>
        )
    }
}

const mapStateToProps = state => ({
    id: state.bookView.id,
    liked: state.bookView.liked,
    likedCount: state.bookView.likedCount,
})

const mapDispatchToProps = dispatch => ({
    like: () => dispatch(likeBook()),
    unLike: () => dispatch(unLikeBook()),
})

const BookLikeButton = connect(mapStateToProps, mapDispatchToProps)(BookLikeButtonComponent)
export default withApollo(BookLikeButton)