import React from "react"
import PageLoader from "components/loader/page";
import ErrorResult from "components/error/result";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux'
import { clearArticle, setArticle } from 'modules/test/edit/reference-article'
import ReferenceArticleBlocks from 'components/test/edit/explanations/references/reference-article-blocks'

const GET_ARTICLE = gql`
  query Article($articleId: ID!) {
    article(articleId: $articleId) {
      id
      title
      imageUrl
      blocks {
        id
        type
        data
      }
      status
      createDate
      updateDate

      tags {
        id
        name
      }

      author {
        id
        displayName
        imageUrl
        description
        url
        twitterId
        facebookId
      }

      skills {
        id
        name
        relatedCount
        level
      }

      actionCount {
        likeCount
        learnedCount
      }

      accountAction {
        liked
        learned
      }
    }
  }
`;

class ReferenceArticleComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ maxWidth: '740px', width: '100%', margin: ' 20px auto', }}>
        <Query
          query={GET_ARTICLE}
          variables={{ articleId: this.props.id }}
          onCompleted={(data) => {
            this.props.setArticle(data.article);
          }}
          onError={() => {
            this.props.clearArticle();
          }}
        >
          {({ loading, error }) => {
            if (loading) return <PageLoader />
            if (error) return <ErrorResult />
            return (
              <>
                <ReferenceArticleBlocks blocks={this.props.blocks} />
              </>
            )
          }}
        </Query>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  title: state.referenceArticle.title,
  imageUrl: state.referenceArticle.imageUrl,
  blocks: state.referenceArticle.blocks,
  tags: state.referenceArticle.tags,
  status: state.referenceArticle.status,
  skills: state.referenceArticle.skills,
  author: state.referenceArticle.author,
  text: state.referenceArticle.text,
  updateDate: state.referenceArticle.updateDate
})

const mapDispatchToProps = dispatch => ({
  clearArticle: () => dispatch(clearArticle()),
  setArticle: (article) => dispatch(setArticle(article)),
})

const ReferenceArticleBlockSelector = connect(mapStateToProps, mapDispatchToProps)(ReferenceArticleComponent)
export default ReferenceArticleBlockSelector;