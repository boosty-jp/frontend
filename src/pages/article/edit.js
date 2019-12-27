import React from 'react';
import withLocation from "components/wrapper/location";
import { Query } from 'react-apollo';
import { Icon, Spin } from 'antd';
import ErrorResult from 'components/error/result';
import gql from 'graphql-tag';
import { clearArticle, setArticle } from 'modules/article/edit'
import ArticleEdit from 'components/article/edit';

const GET_ARTICLE = gql`
query GetArticle($articleId: ID!){
  article(articleId: $articleId){
    id
    title
    imageUrl
    blocks {
      type
      data
    }

    status
    createdDate
    updateDate

    tags {
      id
      name
    }

    skills {
      id
      name
      level
    }
  }
}
`;

const ArticleEditPage = ({ search }) => {
    const { id } = search
    clearArticle();
    if (id) {
        return (
            <Query
                query={GET_ARTICLE}
                fetchPolicy='network-only'
                variables={{ articleId: id }}
                onCompleted={(data) => setArticle(data.article)}
            >
                {({ loading, error }) => {
                    if (loading) {
                        return (
                            <Spin spinning={loading} tip="アップロード中です" indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
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

export default withLocation(ArticleEditPage)