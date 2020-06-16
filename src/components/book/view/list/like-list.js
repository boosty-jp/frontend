import React from "react"
import { List, Spin, Typography, message } from 'antd'
import { Query } from 'react-apollo'
import { Link } from "gatsby"
import { LoadingOutlined } from '@ant-design/icons';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import ErrorResult from "components/error/result";
import { getErrorMessage } from "utils/error-handle";
import { createBookDetailLink } from "utils/link-generator"
import SaleBookItem from "components/book/view/list/sale-item";

const GET_LIKE_BOOKS = gql`
  query GetLikeBooks($page: Int!) {
    likedBooks(page: $page) {
      books {
        id
        title
        imageUrl
        likedCount
        price
        author {
          displayName
        }
      }
      sumCount
    }
}
`;

const gridStyle = {
    gutter: 24,
    xs: 2,
    sm: 2,
    md: 3,
    lg: 6,
    xl: 6,
    xxl: 6,
}

class LikedBookList extends React.Component {
    state = { loading: true, data: null, error: null };

    handleComplete = data => {
        this.setState({ loading: false, data })
    }

    handleError = error => {
        this.setState({ loading: false, error })
    }

    paginate = async book => {
        this.setState({ loading: true })
        try {
            const { data } = await this.props.client.query({
                query: GET_LIKE_BOOKS,
                variables: { book: book, }
            });
            this.setState({ data });
        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }
        this.setState({ loading: false })
    }

    render() {
        const data = this.state.data ? this.state.data.likedBooks.books : [];
        const sumCount = this.state.data ? this.state.data.likedBooks.sumCount : 0;

        return (
            <div style={{ padding: '20px 0px' }}>
                <Query
                    fetchPolicy="no-cache"
                    query={GET_LIKE_BOOKS}
                    variables={{ page: 1 }}
                    onError={this.handleError}
                    onCompleted={this.handleComplete}
                >
                    {() => {
                        return (
                            this.state.error ?
                                <ErrorResult />
                                :
                                <Spin tip="読込中です" indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} spinning={this.state.loading}>
                                    <List
                                        grid={gridStyle}
                                        pagination={{
                                            onChange: this.paginate,
                                            bookSize: 24,
                                            total: sumCount
                                        }}
                                        dataSource={data}
                                        renderItem={book => (
                                            <List.Item>
                                                <Link to={createBookDetailLink(book.id)}>
                                                    <SaleBookItem
                                                        title={book.title}
                                                        imageUrl={book.imageUrl}
                                                        author={book.author}
                                                        price={book.price}
                                                        likedCount={book.likedCount}
                                                        fontSize="16px"
                                                    />
                                                </Link>
                                            </List.Item>
                                        )}
                                    />
                                </Spin>
                        )
                    }}
                </Query >
            </div>
        )
    }
}

export default withApollo(LikedBookList)