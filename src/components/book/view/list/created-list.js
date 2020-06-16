import React from "react"
import PageLoader from "components/loader/page";
import ErrorResult from "components/error/result";
import { withApollo } from 'react-apollo'
import { message, List } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'gatsby';
import { getErrorMessage } from "utils/error-handle";
import { getCondition } from "utils/search-condition";
import OwnBookItem from 'components/book/view/list/own-item'
import { createBookDetailLink } from 'utils/link-generator'

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontColor: 'black',
}


const GET_BOOK_LIST = gql`
  query CreatedBooks($userId: ID!, $searchCondition: SearchCondition) {
    createdBooks(userId: $userId, condition: $searchCondition) {
      books {
        id
        title
        imageUrl
        status
        purchasedCount
        createDate
        updateDate
      }
      sumCount
    }
  }
`;

class CreatedBookList extends React.Component {
    state = {
        loading: false,
        books: [],
        sumCount: 0,
        condition: {
            filter: "",
            sortField: "",
            sortOrder: "updateTime",
            page: 1,
            resultCount: 12,
        },
        data: { createdBooks: { books: [] } },
    }

    onChange = async (page, filters, sorter) => {
        try {
            this.setState({ loading: true, });
            const { data } = await this.props.client.query({
                query: GET_BOOK_LIST,
                variables: {
                    userId: this.props.id,
                    searchCondition: getCondition(page, filters, sorter),
                }
            });
            this.setState({ data });
        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <div style={cardStyle}>
                <p style={{ fontSize: '22px', fontWeight: 'bold', color: 'black', textAlign: 'center' }}>著書</p>
                <Query
                    query={GET_BOOK_LIST}
                    variables={{
                        userId: this.props.id,
                        searchCondition: {
                            filter: "",
                            sortField: "",
                            sortOrder: "updateTime",
                            page: 1,
                            resultCount: 12,
                        }
                    }}
                    onCompleted={data => this.setState({ data })}
                >
                    {({ loading, error }) => {
                        if (loading) return <PageLoader />
                        if (error) return <ErrorResult />
                        return (
                            <List
                                grid={{
                                    gutter: 16,
                                    xs: 3,
                                    sm: 4,
                                    md: 4,
                                    lg: 6,
                                    xl: 6,
                                    xxl: 6,
                                }}
                                pagination={{
                                    onChange: page => this.onChange(page, this.state.filter, this.state.resultCount),
                                    pageSize: 12,
                                }}
                                dataSource={this.state.data.createdBooks.books}
                                renderItem={book => (
                                    <List.Item>
                                        <Link to={createBookDetailLink(book.id)}>
                                            <div style={{ width: '100%' }}>
                                                <OwnBookItem imageUrl={book.imageUrl} title={book.title} author={{ name: "" }} />
                                            </div>
                                        </Link>
                                    </List.Item>
                                )}
                            />
                        )
                    }}
                </Query>
            </div>
        )
    }
}

export default withApollo(CreatedBookList)