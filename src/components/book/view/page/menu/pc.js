import React from "react"
import { Affix } from 'antd';
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
import { setBookData } from 'modules/book/view'
import { withApollo } from 'react-apollo'
import ErrorResult from "components/error/result";
import BookViewMenuSections from "./sections";
import BookViewMenuHeader from "./header";
import VerticalMenu from "components/menu/vertical"

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
            githubId
        }
        updateDate
    }
}
`;

const bookMenuStyle = {
  padding: '16px',
  width: '100%',
  backgroundColor: '#F7FAFF',
  height: '100vh',
  borderRight: '1px solid #d6e4ff',
}

const gridStyle = {
  height: "100vh",
  display: 'grid',
  gridTemplateColumns: '60px 1fr',
}

class PcBookViewMenuComponent extends React.Component {
  render() {
    return (
      <Affix offsetTop={0}>
        <div style={gridStyle}>
          <div style={{ zIndex: '10' }}>
            <VerticalMenu />
          </div>
          <div style={{ maxWidth: '300px', ...bookMenuStyle }}>
            <Query
              query={GET_BOOK}
              variables={{ bookId: this.props.bookId }}
              onCompleted={(data) => {
                this.props.setBookData(data.book, false);
              }}
            >
              {({ loading, error }) => {
                if (loading) return <></>
                if (error) return <ErrorResult />
                return (
                  <>
                    <div style={{ padding: '0px 10px', height: '70px' }}>
                      <BookViewMenuHeader />
                    </div>
                    <div style={{ marginTop: '0px', height: 'calc(100vh - 100px)' }}>
                      <BookViewMenuSections pageId={this.props.id} background="#F7FAFF" />
                    </div>
                  </>
                )
              }}
            </Query >
          </div>
        </div>
      </Affix >
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setBookData: (book, isPreview) => dispatch(setBookData(book, isPreview)),
})

const PcBookViewMenu = connect(null, mapDispatchToProps)(PcBookViewMenuComponent);
export default withApollo(PcBookViewMenu)