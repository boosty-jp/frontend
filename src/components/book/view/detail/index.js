import React from "react"
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
import { setBookData } from 'modules/book/view'
import { withApollo } from 'react-apollo'
import ErrorResult from "components/error/result";
import BookDetailCard from "./card";
import PageLoader from "components/loader/page";

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
        purchased
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
        lastViewedPageId
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

class BookViewComponent extends React.Component {
    render() {
        return (
            <Query
                query={GET_BOOK}
                fetchPolicy="no-cache"
                variables={{ bookId: this.props.id }}
                onCompleted={(data) => {
                    this.props.setBookData(data.book);
                }}
            >
                {({ loading, error }) => {
                    if (loading) return <PageLoader />
                    if (error) return <ErrorResult />
                    return (
                        <BookDetailCard />
                    )
                }}
            </Query >
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setBookData: (book) => dispatch(setBookData(book)),
})

const BookView = connect(null, mapDispatchToProps)(BookViewComponent);
export default withApollo(BookView)