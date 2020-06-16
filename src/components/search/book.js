import React from "react"
import { message, Input, Typography, List, Empty } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "gatsby"
import { createBookDetailLink } from "utils/link-generator"
import { withApollo } from 'react-apollo'
import OwnBookItem from 'components/book/view/list/own-item'
import gql from 'graphql-tag';
import { getErrorMessage } from "utils/error-handle";

const { Search } = Input;
const { Paragraph } = Typography;

const cardStyle = {
    margin: '30px auto',
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderRadius: '1rem',
    padding: '20px',
    fontColor: 'black',
    maxWidth: '800px',
    width: '100%',
}

const GET_SEARCHED_BOOKS = gql`
  query GetSearchedBook($query: String!, $page: Int!) {
    searchedBooks(query: $query, page: $page) {
      books {
        id
        title
        price
        imageUrl
        author{
          displayName
        }
      }
      sumCount
    }
}
`;

const SearchResults = ({ results, searchWord, search }) => {
    if (results.length === 0) {
        if (searchWord) {
            return (
                <div style={cardStyle}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="見つかりませんでした" />
                </div>
            )
        } else {
            return <></>
        }
    }

    return (
        <div style={cardStyle}>
            <List
                grid={{
                    gutter: 16,
                    xs: 2,
                    sm: 4,
                    md: 4,
                    lg: 4,
                    xl: 4,
                    xxl: 4,
                }}
                dataSource={results}
                pagination={{
                    onChange: page => search(searchWord, page),
                    pageSize: 24,
                }}
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
        </div>
    );
}

class SearchComponent extends React.Component {
    state = { results: [], searchWord: "", loading: false, page: 1, sumCount: 0 }

    handleSearch = async (value, page) => {
        value = value.replace(/\s+/g, "");

        if (!value) {
            this.setState({ results: [], searchWord: "" });
            this.setState({ loading: false });
            return;
        }

        try {
            this.setState({ loading: true, });
            const { data } = await this.props.client.query({
                query: GET_SEARCHED_BOOKS,
                variables: {
                    query: value,
                    page: page
                }
            });
            this.setState({ searchWord: value, loading: false, results: data.searchedBooks.books, sumCount: data.sumCount });
        } catch (err) {
            message.error(getErrorMessage(err), 7)
            this.setState({ loading: false, results: [], searchWord: "" });
        }
    };

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <Paragraph style={{ textAlign: 'center', fontSize: '28px', color: 'black' }}>検索</Paragraph>
                <div style={{ margin: '0 auto' }}>
                    <Search
                        placeholder="検索ワードを入力してください"
                        enterButton={<SearchOutlined />}
                        size="large"
                        onSearch={value => this.handleSearch(value, 1)}
                        style={{ maxWidth: '500px', }}
                        loading={this.state.loading}
                        disabled={this.state.loading}
                    />
                    <SearchResults results={this.state.results} searchWord={this.state.searchWord} search={this.handleSearch} />
                </div>
            </div>
        )
    }
}

export default withApollo(SearchComponent)