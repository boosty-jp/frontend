import React from "react"
import { List, Spin, message } from 'antd'
import { Query } from 'react-apollo'
import { LoadingOutlined, ReadOutlined } from '@ant-design/icons';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import ErrorResult from "components/error/result";
import { getErrorMessage } from 'utils/error-handle'
import AllNewItem from "components/book/view/list/all-new-item";

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontColor: 'black',
    minHeight: '500px',
}

const GET_ALl_NEW_BOOKS = gql`
  query GetAllNewBook($page: Int!) {
    allNewBooks(page: $page) {
      books {
        id
        title
        imageUrl
        author {
          displayName
        }
        meaningful
        updateDate
      }
      sumCount
    }
}
`;

class AllNewList extends React.Component {
    state = { loading: true, data: null, error: null }

    paginate = async page => {
        this.setState({ loading: true })
        try {
            const { data } = await this.props.client.query({
                query: GET_ALl_NEW_BOOKS,
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
        const data = this.state.data ? this.state.data.allNewBooks.books : [];
        const sumCount = this.state.data ? this.state.data.allNewBooks.sumCount : 0;

        return (
            <Query
                fetchPolicy="no-cache"
                query={GET_ALl_NEW_BOOKS}
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
                                        <ReadOutlined style={{ marginRight: '8px' }} />
                                        <span>新刊の本</span>
                                    </p>
                                    <List
                                        pagination={{
                                            onChange: this.paginate,
                                            pageSize: 12,
                                            total: sumCount
                                        }}
                                        dataSource={data}
                                        renderItem={book => (
                                            <List.Item>
                                                <div style={{ width: '100%', margin: '0 auto' }}>
                                                    <AllNewItem
                                                        id={book.id}
                                                        imageUrl={book.imageUrl}
                                                        title={book.title}
                                                        author={{ name: book.author.displayName }}
                                                        meaningful={book.meaningful}
                                                        updateDate={book.updateDate}
                                                    />
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

export default withApollo(AllNewList)