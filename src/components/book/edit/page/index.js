import React from 'react';
import withLocation from "components/wrapper/location";
import { connect } from 'react-redux'
import { Query } from 'react-apollo';
import ErrorResult from 'components/error/result';
import gql from 'graphql-tag';
import { setPage } from 'modules/page/edit'
import PageLoader from 'components/loader/page';
import PagePreviewHandler from './preview-handler';

const GET_PAGE = gql`
  query PageToEdit($pageId: ID!) {
    pageToEdit(pageId: $pageId) {
      id
      title
      text
      canPreview
      createDate
      updateDate
    }
  }
`;

const PageEditComponent = (props) => {
  return (
    <Query
      query={GET_PAGE}
      fetchPolicy='network-only'
      variables={{ pageId: props.id }}
      onCompleted={data => { props.setPage(data.pageToEdit) }}
    >
      {({ loading, error }) => {
        if (loading) {
          return (
            <PageLoader />
          )
        }

        if (error) return <ErrorResult />

        return <PagePreviewHandler bookId={props.bookId} />
      }}
    </Query>
  )
}

const mapDispatchToProps = dispatch => ({
  setPage: (page) => dispatch(setPage(page)),
})

const PageEditPage = connect(null, mapDispatchToProps)(PageEditComponent)
export default withLocation(PageEditPage)