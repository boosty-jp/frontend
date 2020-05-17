import React from "react"
import { connect } from 'react-redux'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { Skeleton } from 'antd';
import { setBookData } from 'modules/book/edit'
import { Query } from 'react-apollo'
import ErrorResult from "components/error/result";
import BookEditTagForm from 'components/book/edit/tag/form'

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

class BookEditTagsComponent extends React.Component {
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
                        <BookEditTagForm id={this.props.id} tags={data.editBook.tags.map(tag => tag.name)} />
                    )
                }}
            </Query >
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setBookData: (book) => dispatch(setBookData(book)),
})

const BookEditTags = connect(null, mapDispatchToProps)(BookEditTagsComponent)
export default withApollo(BookEditTags)