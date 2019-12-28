import React from "react"
import { connect } from 'react-redux'
import { message, Button } from 'antd';
import { toggleLearn } from 'modules/article/view'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'

const LEARN_ARTICLE = gql`
mutation LearnArticle($articleId: ID!){
  learnArticle(articleId: $articleId)
}
`;

const CLEAR_LEARN_ARTICLE = gql`
mutation ClearLearnArticle($articleId: ID!){
  clearLearnArticle(articleId: $articleId)
}
`;

class LearnButton extends React.Component {
    state = {
        loading: false,
    }

    learn = async () => {
        try {
            this.setState({ loading: true })
            await this.props.client.mutate({
                mutation: this.props.learned ? CLEAR_LEARN_ARTICLE : LEARN_ARTICLE,
                variables: {
                    articleId: this.props.id
                }
            });
            this.props.toggleLearn();
        } catch (err) {
            message.error("エラーが発生しました。お手数ですが、再度お試しください", 7)
        }

        this.setState({ loading: false })
    }

    render() {
        return (
            <>
                <Button
                    icon="check"
                    shape="circle"
                    onClick={this.learn}
                    loading={this.state.loading}
                    style={{ color: this.props.learned ? 'green' : 'grey' }}
                />
                <span style={{ marginLeft: '8px' }}>{this.props.learnedCount}</span>
            </>
        )
    }
}

const mapStateToProps = state => ({
    id: state.articleView.id,
    learnedCount: state.articleView.actionCount.learnedCount,
    learned: state.articleView.accountAction.learned,
})

const mapDispatchToProps = dispatch => ({
    toggleLearn: () => dispatch(toggleLearn()),
})

const ArticleLearnButton = connect(mapStateToProps, mapDispatchToProps)(LearnButton)
export default withApollo(ArticleLearnButton);