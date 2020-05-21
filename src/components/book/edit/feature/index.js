import React from "react"
import { connect } from 'react-redux'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { Skeleton } from 'antd';
import { setBookData } from 'modules/book/edit'
import { Query } from 'react-apollo'
import ErrorResult from "components/error/result";
import BookEditFeaturesForm from "components/book/edit/feature/form"

const GET_BOOK = gql`
  query GetBook($bookId: ID!) {
    editBook(bookId: $bookId) {
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
    }
}
`;

class BookEditFeaturesComponents extends React.Component {
    render() {
        return (
            <Query
                query={GET_BOOK}
                variables={{ bookId: this.props.id }}
                onCompleted={(data) => this.props.setBookData(data.editBook)}
            >
                {({ loading, error, data }) => {
                    if (loading) return <Skeleton active paragraph={{ rows: 6 }} />
                    if (error) return <ErrorResult />
                    return (
                        <BookEditFeaturesForm
                            id={this.props.id}
                            features={data.editBook.features.length === 0 ? [] : data.editBook.features}
                        />
                    )
                }}
            </Query >
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setBookData: (book) => dispatch(setBookData(book)),
})

const BookEditFeatures = connect(null, mapDispatchToProps)(BookEditFeaturesComponents)
export default withApollo(BookEditFeatures)