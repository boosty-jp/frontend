import React from "react"
import { List, Spin, Typography, message } from 'antd'
import { Query } from 'react-apollo'
import { Link } from "gatsby"
import { LoadingOutlined, HeartTwoTone } from '@ant-design/icons';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import ErrorResult from "components/error/result";
import { createPageViewLink } from 'utils/link-generator'
import { isLoggedIn } from "services/local-user";
import NeedLoginComponent from "components/auth/need-login";
import { getErrorMessage } from "utils/error-handle";
import BookCoverImage from "components/image/cover";

const { Paragraph } = Typography;

const boardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontColor: 'black',
    minHeight: '500px',
}

const cardStyle = {
    padding: '16px',
    borderRadius: '0.5rem',
    width: '100%',
    height: '100%',
    background: 'white',
    marginTop: "20px",
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
}

const GET_LIKE_PAGES = gql`
  query GetLikePages($page: Int!) {
    likedPages(page: $page) {
      pages {
        id
        title
        bookId
        bookTitle
        bookImage
      }
      sumCount
    }
}
`;

const gridStyle = {
    gutter: 24,
    xs: 1,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 3,
    xxl: 3,
}

class LikedPageList extends React.Component {
    state = { loading: true, data: null, error: null };

    handleComplete = data => {
        this.setState({ loading: false, data })
    }

    handleError = error => {
        this.setState({ loading: false, error })
    }

    paginate = async page => {
        this.setState({ loading: true })
        try {
            const { data } = await this.props.client.query({
                query: GET_LIKE_PAGES,
                variables: { page: page, }
            });
            this.setState({ data });
        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }
        this.setState({ loading: false })
    }

    render() {
        if (!isLoggedIn()) {
            return (<NeedLoginComponent />)
        }

        const data = this.state.data ? this.state.data.likedPages.pages : [];
        const sumCount = this.state.data ? this.state.data.likedPages.sumCount : 0;

        return (
            <Query
                fetchPolicy="no-cache"
                query={GET_LIKE_PAGES}
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
                                <div style={boardStyle}>
                                    <p style={{ fontSize: '22px', fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
                                        <HeartTwoTone twoToneColor="#ff7875" style={{ marginRight: '8px' }} /><span>お気に入り</span>
                                    </p>
                                    <List
                                        grid={gridStyle}
                                        pagination={{
                                            onChange: this.paginate,
                                            pageSize: 24,
                                            total: sumCount
                                        }}
                                        dataSource={data}
                                        renderItem={page => (
                                            <List.Item style={{ width: '100%', height: '80%' }}>
                                                <Link to={createPageViewLink(page.id, page.bookId)}>
                                                    <div style={cardStyle}>
                                                        <Paragraph style={{ color: 'black', fontWeight: 'bold', fontSize: '16px' }}>{page.title}</Paragraph>
                                                        <div style={{ overflow: 'hidden', color: 'gray', display: 'grid', gridTemplateColumns: '18px 1fr', width: "100%" }}>
                                                            <BookCoverImage imageUrl={page.bookImage} boxShadow="2px 2px 4px #cdd0d4, -2px -2px 4px #ffffff" borderRadius="2px" />
                                                            <div><Paragraph ellipsis style={{ marginBottom: '0px', marginTop: '4px', marginLeft: '4px' }}>「{page.bookTitle}」より</Paragraph></div>
                                                        </div>
                                                    </div>
                                                </Link>
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

export default withApollo(LikedPageList)