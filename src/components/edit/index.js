import React from "react"
import { Typography, message, Radio } from 'antd';
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import EditableBookList from "components/book/edit/list/list";
import EditableArticleList from "components/article/edit/list";
import SimpleBorderedShadowButton from "components/button/simple-border-shadow";
import { createBookEditLink, createArticleEditLink } from "utils/link-generator";
import { getErrorMessage } from "utils/error-handle";
import { PlusOutlined, ReadOutlined, FileTextOutlined } from '@ant-design/icons'
import { isLoggedIn } from "services/local-user";
import NeedLoginComponent from "components/auth/need-login";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const { Paragraph } = Typography;

const CREATE_BOOK = gql`
mutation CreateBook {
  createBook {
    id
  }
}
`;

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontColor: 'black',
}

class ContentEditList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, mode: "book" }
    }

    create = async () => {
        this.setState({ loading: true });

        if (this.state.mode === "book") {
            this.createBook();
        } else {
            this.createArticle();
        }
    };

    createArticle = async () => {
        try {
            // const { data } = await this.props.client.mutate({
            //     mutation: CREATE_BOOK,
            // });

            navigate(createArticleEditLink("hoge"))
        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }
        this.setState({ loading: false });
    }

    createBook = async () => {
        try {
            const { data } = await this.props.client.mutate({
                mutation: CREATE_BOOK,
            });

            navigate(createBookEditLink(data.createBook.id))
        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }
        this.setState({ loading: false });
    }

    changeMode = e => {
        this.setState({ mode: e.target.value });
    }

    render() {
        if (!isLoggedIn()) {
            return (<NeedLoginComponent />)
        }

        return (
            <div style={{ padding: '20px', width: '100%', margin: 'auto' }}>
                <Paragraph style={{ textAlign: 'center', fontSize: '28px', color: 'black' }}>コンテンツ一覧</Paragraph>
                <div style={cardStyle}>
                    <div style={{ marginBottom: '20px' }}>
                        <Radio.Group
                            defaultValue="book"
                            buttonStyle="solid"
                            onChange={this.changeMode}
                            style={{ boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }}
                        >
                            <Radio.Button value="book"><ReadOutlined style={{ marginRight: '8px' }} />技術書</Radio.Button>
                            <Radio.Button value="article"><FileTextOutlined style={{ marginRight: '8px' }} />記事</Radio.Button>
                        </Radio.Group>

                        <SimpleBorderedShadowButton
                            icon={<PlusOutlined />}
                            text="新規作成"
                            color="#1890ff"
                            onClick={this.create}
                            loading={this.state.loading}
                            style={{ float: 'right' }}
                        />
                    </div>
                    {this.state.mode === "book" && <EditableBookList />}
                    {this.state.mode === "article" && <EditableArticleList />}
                </div>
            </div>
        )
    }
}

export default withApollo(ContentEditList)