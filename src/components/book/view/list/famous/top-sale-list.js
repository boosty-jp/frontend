import React from "react"
import { List, Skeleton } from 'antd'
import { Query } from 'react-apollo'
import { Link } from "gatsby"
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { createBookDetailLink } from 'utils/link-generator'
import SaleBookItem from "components/book/view/list/sale-item"

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontColor: 'black',
    minHeight: '300px',
}

const GET_FAMOUS_BOOKS = gql`
  query GetFamousBooks($page: Int!) {
    famousBooks(page: $page) {
      books {
        id
        title
        imageUrl
        price
        author{
          displayName
        }
        likedCount
      }
      sumCount
    }
}
`;

const FamousBookList = () => (
    <Query
        fetchPolicy='cache-first'
        query={GET_FAMOUS_BOOKS}
        variables={{ page: 1 }}
    >
        {({ loading, error, data }) => {
            if (loading) {
                return (
                    <div style={cardStyle}>
                        <p style={{ fontSize: '22px', fontWeight: 'bold', color: 'black', textAlign: 'center' }}>人気の有料の本</p>
                        <Skeleton paragraph={{ rows: 6 }} active />
                    </div>
                )
            }
            if (error) return <></>
            if (data.famousBooks.books.length === 0) return <></>
            return (
                <div style={cardStyle}>
                    <p style={{ fontSize: '22px', fontWeight: 'bold', color: 'black', textAlign: 'center' }}>人気の有料の本</p>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 2,
                            sm: 4,
                            md: 4,
                            lg: 4,
                            xl: 6,
                            xxl: 6,
                        }}
                        dataSource={data.famousBooks.books}
                        renderItem={book => (
                            <List.Item>
                                <Link to={createBookDetailLink(book.id)}>
                                    <div style={{ width: '100%', margin: '0 auto' }}>
                                        <SaleBookItem
                                            price={book.price}
                                            title={book.title}
                                            imageUrl={book.imageUrl}
                                            likedCount={book.likedCount}
                                            author={{ name: book.author.displayName }}
                                        />
                                    </div>
                                </Link>
                            </List.Item>
                        )}
                    />
                </div>
            )
        }}
    </Query >
)

export default withApollo(FamousBookList)