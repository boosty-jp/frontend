import React from "react"
import { Row, Col } from 'antd';
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
import { setBookData } from 'modules/book/view'
import { withApollo } from 'react-apollo'
import ErrorResult from "components/error/result";
import PageLoader from "components/loader/page";
import BookViewMenuSections from "./sections";
import BookViewMenuButtons from 'components/book/view/page/menu/buttons'
import PageSearchForm from "./search";
import BookViewMenuHeader from "./header";

const GET_BOOK = gql`
  query GetBook($bookId: ID!) {
    book(bookId: $bookId) {
        id
        title
        imageUrl
        description
        price
        features
        targets {
            levelStart
            levelEnd
            targetDescriptions
        }
        status
        tags {
            id
            name
        }
        sections {
            id
            number
            title
            pages {
                id
                number
                title
                canPreview
            }
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
        updateDate
    }
}
`;

const cardStyle = {
  backgroundColor: 'white',
  boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
  borderRadius: '2rem',
  width: '100%',
  height: '100%',
  padding: '20px',
  fontColor: 'black',
  marginLeft: 'auto',
  maxWidth: '300px',
}

class PcBookViewMenuComponent extends React.Component {
  render() {
    return (
      <Row>
        <Col xs={0} sm={0} md={0} lg={0} xl={24} xxl={24}>
          <div style={{ position: "fixed", left: '0px', padding: '60px 0px 0px 20px', width: 'calc((100% - 800px) / 2)' }}>
            <div style={cardStyle}>
              <Query
                query={GET_BOOK}
                variables={{ bookId: this.props.bookId }}
                onCompleted={(data) => {
                  this.props.setBookData(data.book, false);
                }}
              >
                {({ loading, error }) => {
                  if (loading) return <PageLoader />
                  if (error) return <ErrorResult />
                  return (
                    <>
                      <BookViewMenuHeader />
                      <PageSearchForm />
                      <div style={{ marginTop: '16px' }}>
                        <BookViewMenuButtons pageId={this.props.id} />
                      </div>
                      <div style={{ marginTop: '16px' }}>
                        <BookViewMenuSections pageId={this.props.id} />
                      </div>
                    </>
                  )
                }}
              </Query >
            </div>
          </div>
        </Col>
      </Row>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setBookData: (book, isPreview) => dispatch(setBookData(book, isPreview)),
})

const PcBookViewMenu = connect(null, mapDispatchToProps)(PcBookViewMenuComponent);
export default withApollo(PcBookViewMenu)