import React from "react"
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { Skeleton } from 'antd';
import { setBookData } from 'modules/book/edit'
import { Query } from 'react-apollo'
import ErrorResult from "components/error/result";
import BookEditFeaturesForm from "components/book/edit/feature/form"

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
    }
}
`;

class BookEditFeaturesComponents extends React.Component {
    render() {
        return (
            <Query
                query={GET_BOOK}
                variables={{ bookId: this.props.id }}
                onCompleted={(data) => this.props.setBookData(data.book)}
            >
                {({ loading, error, data }) => {
                    if (loading) return <Skeleton active paragraph={{ rows: 6 }} />
                    if (error) return <ErrorResult />
                    return (
                        <BookEditFeaturesForm
                            id={this.props.id}
                            features={
                                data.book.features.length === 0 ?
                                    [{ id: uuidv4(), value: "" }]
                                    :
                                    data.book.features.map(f => { return { id: uuidv4(), value: f } })
                            }
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