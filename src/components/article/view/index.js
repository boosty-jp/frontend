import React from "react"
import { Rate, Typography, Tag, Divider, Alert } from 'antd';
import PageLoader from "components/loader/page";
import ErrorResult from "components/error/result";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux'
import { clearArticle, setArticle } from 'modules/article/view'
import ThumbnailImage from "components/image/thumbnail";

const { Title } = Typography;
const rateDescription = ['初級', '中級', '上級'];

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


class ArticleContentComponent extends React.Component {
    constructor(props) {
        super(props);
        props.clearArticle();
    }

    render() {
        return (
            <Query
                query={GET_ARTICLE}
                variables={{ articleId: this.props.id }}
                onCompleted={(data) => {
                    this.props.setArticle(data.article);
                }}
            >
                {({ loading, error }) => {
                    if (loading) return <PageLoader />
                    if (error) return <ErrorResult />
                    return (
                        <>
                            <ThumbnailImage imageUrl={this.props.imageUrl} />
                            <div style={{ padding: '24px' }}>
                                <Typography>
                                    <Title>{this.props.title}</Title>
                                </Typography>
                                {this.props.status === 'draft' &&
                                    <Alert message="下書き中の記事です。作成者以外には閲覧できないようになっています。" type="warning" showIcon />
                                }
                                <div>
                                    {this.props.tags.map(t => {
                                        return (
                                            <Tag key={t.id}>{t.name}</Tag>
                                        )
                                    })}
                                </div>
                                <div style={{ marginTop: '12px' }}>
                                    {this.props.skills.map(s => {
                                        return (
                                            <div key={s.id}>
                                                <span style={{ fontWeight: '500', fontSize: '16px', marginRight: '16px' }}>{s.name}</span>
                                                <Rate
                                                    count={3}
                                                    disabled
                                                    value={s.level}
                                                    tooltips={rateDescription}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                                <Divider />
                                {this.props.text}
                            </div>
                        </>
                    )
                }}
            </Query>
        )
    }
}

const mapStateToProps = state => ({
    title: state.articleView.title,
    imageUrl: state.articleView.imageUrl,
    tags: state.articleView.tags,
    status: state.articleView.status,
    skills: state.articleView.skills,
    text: state.articleView.text,
})

const mapDispatchToProps = dispatch => ({
    clearArticle: () => dispatch(clearArticle()),
    setArticle: (article) => dispatch(setArticle(article)),
})

const ArticleContent = connect(mapStateToProps, mapDispatchToProps)(ArticleContentComponent)
export default ArticleContent;