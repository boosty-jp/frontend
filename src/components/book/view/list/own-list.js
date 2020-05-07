import React from "react"
import { List, Spin, message } from 'antd'
import { Query } from 'react-apollo'
import { LoadingOutlined, BookTwoTone } from '@ant-design/icons';
import OwnBookItem from 'components/book/view/list/item'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import ErrorResult from "components/error/result";
import { createPageViewLink } from 'utils/link-generator'
import { isLoggedIn } from "services/local-user";
import NeedLoginComponent from "components/auth/need-login"
import { getErrorMessage } from 'utils/error-handle'

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontColor: 'black',
    minHeight: '500px',
}

const GET_OWN_BOOKS = gql`
  query GetOwnBook($page: Int!) {
    ownBooks(page: $page) {
      books {
        id
        title
        imageUrl
        author {
          displayName
        }
      }
      sumCount
    }
}
`;

const GET_PAGE_ID_TO_READ = gql`
  query GetPageIdToRead($bookId: ID!) {
    pageIdToRead(bookId: $bookId)
}
`;

const gridStyle = {
    gutter: 16,
    xs: 2,
    sm: 4,
    md: 4,
    lg: 4,
    xl: 6,
    xxl: 6,
}
class OwnBookList extends React.Component {
    state = { loading: true, data: null, error: null }

    moveToBookPage = async (bookId) => {
        this.setState({ loading: true });
        try {
            const { data } = await this.props.client.query({
                query: GET_PAGE_ID_TO_READ,
                variables: { bookId: bookId }
            });
            navigate(createPageViewLink(data.pageIdToRead, bookId));
        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }
        this.setState({ loading: false });
    }

    paginate = async page => {
        this.setState({ loading: true })
        try {
            const { data } = await this.props.client.query({
                query: GET_OWN_BOOKS,
                variables: { page: page, }
            });
            this.setState({ data });
        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }
        this.setState({ loading: false })
    }

    handleComplete = data => {
        this.setState({ loading: false, data })
    }

    handleError = error => {
        this.setState({ loading: false, error })
    }

    render() {

        if (!isLoggedIn()) {
            return (<NeedLoginComponent />)
        }

        const data = this.state.data ? this.state.data.ownBooks.books : [];
        const sumCount = this.state.data ? this.state.data.ownBooks.sumCount : 0;

        return (
            <Query
                query={GET_OWN_BOOKS}
                variables={{ page: 1 }}
                onError={this.handleError}
                onCompleted={this.handleComplete}
            >
                {() => {
                    return (
                        this.state.error ?
                            <ErrorResult />
                            :
                            <Spin
                                tip="読込中です"
                                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                                spinning={this.state.loading}
                            >
                                <div style={cardStyle}>
                                    <p style={{ fontSize: '22px', fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
                                        <BookTwoTone style={{ marginRight: '8px' }} />
                                        <span>本棚</span>
                                    </p>
                                    <List
                                        grid={gridStyle}
                                        pagination={{
                                            onChange: this.paginate,
                                            pageSize: 24,
                                            total: sumCount
                                        }}
                                        dataSource={data}
                                        renderItem={book => (
                                            <List.Item>
                                                <div style={{ width: '100%', margin: '0 auto', cursor: 'pointer' }} onClick={() => this.moveToBookPage(book.id)}>
                                                    <OwnBookItem imageUrl={book.imageUrl} title={book.title} author={{ name: book.author.displayName }} />
                                                </div>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            </Spin>
                    )
                }}
            </Query >
        )
    }
}

export default withApollo(OwnBookList)