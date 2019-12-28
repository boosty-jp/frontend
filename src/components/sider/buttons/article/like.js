import React from "react"
import { connect } from 'react-redux'
import { message, Button } from 'antd';
import { toggleLike } from 'modules/article/view'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'

const LIKE_ARTICLE = gql`
mutation LikeArticle($articleId: ID!){
  likeArticle(articleId: $articleId)
}
`;

const CLEAR_LIKE_ARTICLE = gql`
mutation ClearLikeArticle($articleId: ID!){
  clearLikeArticle(articleId: $articleId)
}
`;

class LikeButton extends React.Component {
    state = {
        loading: false,
    }

    like = async () => {
        try {
            this.setState({ loading: true })
            await this.props.client.mutate({
                mutation: this.props.liked ? CLEAR_LIKE_ARTICLE : LIKE_ARTICLE,
                variables: {
                    articleId: this.props.id
                }
            });
            this.props.toggleLike();
        } catch (err) {
            message.error("エラーが発生しました。お手数ですが、再度お試しください", 7)
        }

        this.setState({ loading: false })
    }

    render() {
        return (
            <>
                <Button
                    icon="heart"
                    shape="circle"
                    onClick={this.like}
                    loading={this.state.loading}
                    style={{ color: this.props.liked ? 'red' : 'grey' }}
                />
                <span style={{ marginLeft: '8px' }}>{this.props.likeCount}</span>
            </>
        )
    }
}

const mapStateToProps = state => ({
    id: state.articleView.id,
    likeCount: state.articleView.actionCount.likeCount,
    liked: state.articleView.accountAction.liked,
})

const mapDispatchToProps = dispatch => ({
    toggleLike: () => dispatch(toggleLike()),
})

const ArticleLikeButton = connect(mapStateToProps, mapDispatchToProps)(LikeButton)
export default withApollo(ArticleLikeButton);