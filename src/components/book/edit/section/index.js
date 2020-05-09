import React from 'react';
import BookEditSections from './sections';
import BookEditSectionHeader from './header';
import { connect } from 'react-redux'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { Skeleton } from 'antd';
import { setBookData } from 'modules/book/edit'
import { Query } from 'react-apollo'
import ErrorResult from "components/error/result";

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

class BookEditSectionComponent extends React.Component {
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
                        <>
                            <BookEditSectionHeader id={this.props.id} />
                            <div style={{ marginTop: '20px' }}>
                                <BookEditSections id={this.props.id} />
                            </div>
                        </>
                    )
                }}
            </Query >
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setBookData: (book) => dispatch(setBookData(book)),
})

const BookEditSection = connect(null, mapDispatchToProps)(BookEditSectionComponent)
export default withApollo(BookEditSection)