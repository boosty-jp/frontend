import React from 'react';
import withLocation from "components/wrapper/location";
import { connect } from 'react-redux'
import { Query } from 'react-apollo';
import { Icon, Spin } from 'antd';
import ErrorResult from 'components/error/result';
import gql from 'graphql-tag';
import { clearArticle, setArticle } from 'modules/article/edit'
import ArticleEdit from 'components/article/edit';

const GET_ARTICLE = gql`
  query Article($articleId: ID!) {
    article(articleId: $articleId) {
      id
      title
      imageUrl
      blocks {
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

const ArticleEditPageComponent = (props) => {
  const { id } = props.search
  props.clearArticle();
  if (id) {
    return (
      <Query
        query={GET_ARTICLE}
        fetchPolicy='network-only'
        variables={{ articleId: id }}
        onCompleted={(data) => {
          props.setArticle(data.article)
        }}
      >
        {({ loading, error }) => {
          if (loading) {
            return (
              <Spin spinning={loading} tip="ロード中です" indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
                <ArticleEdit />
              </Spin>
            )
          }

          if (error) return <ErrorResult />
          return <ArticleEdit />
        }}
      </Query>
    )
  }
  return (<ArticleEdit />);
}

const mapDispatchToProps = dispatch => ({
  setArticle: (article) => dispatch(setArticle(article)),
  clearArticle: () => dispatch(clearArticle()),
})

const ArticleEditPage = connect(null, mapDispatchToProps)(ArticleEditPageComponent)
export default withLocation(ArticleEditPage)