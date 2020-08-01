import React from 'react';
import withLocation from "components/wrapper/location";
import { connect } from 'react-redux'
import { Query } from 'react-apollo';
import ErrorResult from 'components/error/result';
import gql from 'graphql-tag';
import { Result, Button } from 'antd';
import { ReadOutlined } from '@ant-design/icons';
import { setPage } from 'modules/page/view'
import PageViewContent from 'components/book/view/page/content';
import PageLoader from 'components/loader/page';
import { needPurchase, getErrorMessage } from 'utils/error-handle';
import { createBookDetailLink } from 'utils/link-generator';
import { Link } from 'gatsby'

const GET_PAGE = gql`
  query Page($bookId:ID!, $pageId: ID!) {
    page(bookId: $bookId, pageId: $pageId) {
      id
      title
      text
      liked
      likeCount
      canPreview
      createDate
      updateDate
    }
  }
`;

const PageViewComponent = (props) => {
  return (
    <Query
      query={GET_PAGE}
      variables={{ pageId: props.id, bookId: props.bookId }}
      onCompleted={(data) => {
        props.setPage(data.page)
      }}
    >
      {({ loading, error }) => {
        if (loading) {
          return (
            <PageLoader />
          )
        }

        if (error) {
          if (needPurchase(error)) {
            return <Result
              icon={<ReadOutlined />}
              title={<>「購入」または<br />「本棚への追加」が必要です</>}
              extra={<Link to={createBookDetailLink(props.bookId)}><Button type="primary">詳細ページへ</Button></Link>}
            />
          }
          return <ErrorResult title={getErrorMessage(error)} />
        }

        return <PageViewContent pageId={props.id} bookId={props.bookId} />
      }}
    </Query>
  )
}

const mapDispatchToProps = dispatch => ({
  setPage: (page) => dispatch(setPage(page)),
})

const PageView = connect(null, mapDispatchToProps)(PageViewComponent)
export default withLocation(PageView)