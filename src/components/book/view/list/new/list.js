import React from "react"
import { List, Skeleton } from 'antd'
import { Query } from 'react-apollo'
import { Link } from "gatsby"
import OwnBookItem from 'components/book/view/list/item'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import ErrorResult from "components/error/result";
import { createBookDetailLink } from 'utils/link-generator'

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontColor: 'black',
    minHeight: '300px',
}

const GET_NEW_SALE_BOOKS = gql`
  query GetNewSaleBook($page: Int!) {
    newBooks(page: $page) {
      books {
        id
        title
        imageUrl
        author{
          displayName
        }
      }
      sumCount
    }
}
`;

const listGridStyle = {
    gutter: 16,
    xs: 2,
    sm: 4,
    md: 4,
    lg: 4,
    xl: 6,
    xxl: 6,
}

class TopNewSaleBookList extends React.Component {
    render() {
        return (

            <Query
                query={GET_NEW_SALE_BOOKS}
                variables={{ page: 1 }}
            >
                {({ loading, error, data }) => {
                    if (loading) {
                        return (
                            <div style={cardStyle}>
                                <p style={{ fontSize: '22px', fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
                                    <span>新刊の本</span>
                                </p>
                                <Skeleton paragraph={{ rows: 6 }} active />
                            </div>
                        )
                    }
                    if (error) return <ErrorResult />
                    return (
                        <div style={cardStyle}>
                            <p style={{ fontSize: '22px', fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
                                <span>新刊の本</span>
                            </p>
                            <List
                                grid={listGridStyle}
                                dataSource={data.newBooks.books}
                                renderItem={book => (
                                    <List.Item>
                                        <Link to={createBookDetailLink(book.id)}>
                                            <div style={{ width: '100%', margin: '0 auto' }}>
                                                <OwnBookItem imageUrl={book.imageUrl} title={book.title} author={{ name: book.author.displayName }} />
                                            </div>
                                        </Link>
                                    </List.Item>
                                )}
                            />
                            <div style={{ margin: '0 auto', textAlign: 'center' }}>
                                <Link to="/book/new" style={{ textAlign: 'center', fontSize: '16px' }}>もっと見る</Link>
                            </div>
                        </div>
                    )
                }}
            </Query >
        )
    }
}

export default withApollo(TopNewSaleBookList)