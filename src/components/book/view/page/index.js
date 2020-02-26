import React from 'react';
import withLocation from "components/wrapper/location";
import { connect } from 'react-redux'
import { Query } from 'react-apollo';
import ErrorResult from 'components/error/result';
import gql from 'graphql-tag';
import { setPage } from 'modules/page/view'
import PageViewContent from 'components/book/view/page/content';
import PageLoader from 'components/loader/page';

const GET_PAGE = gql`
  query Page($bookId:ID!, $pageId: ID!) {
    page(bookId: $bookId, pageId: $pageId) {
      base{
        id
        title
        canPreview
        createDate
        updateDate
      }
      blocks {
        type
        data
      }
    }
  }
`;

const PageViewComponent = (props) => {
  return (
    <Query
      query={GET_PAGE}
      fetchPolicy='network-only'
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

        if (error) return <ErrorResult />

        return <PageViewContent />
      }}
    </Query>
  )
}

const mapDispatchToProps = dispatch => ({
  setPage: (page) => dispatch(setPage(page)),
})

const PageView = connect(null, mapDispatchToProps)(PageViewComponent)
export default withLocation(PageView)