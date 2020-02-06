import React from "react"
import { Typography, message } from 'antd';
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import EditableBookList from "components/book/edit/list/list";
import SimpleBorderedShadowButton from "components/button/simple-border-shadow";
import { createBookEditLink } from "utils/link-generator";
import { getErrorMessage } from "utils/error-handle";

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

class BookEditList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false }
    }

    createBook = async () => {
        this.setState({ loading: true });
        try {
            const { data } = await this.props.client.mutate({
                mutation: CREATE_BOOK,
            });

            navigate(createBookEditLink(data.createBook.id))
        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }
        this.setState({ loading: false });
    };

    render() {
        return (
            <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
                <Paragraph style={{ textAlign: 'center', fontSize: '28px', color: 'black' }}>著書一覧</Paragraph>
                <div style={cardStyle}>
                    <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                        <SimpleBorderedShadowButton
                            icon="plus"
                            text="新規作成"
                            color="#1890ff"
                            onClick={this.createBook}
                            loading={this.state.loading}
                        />
                    </div>
                    <EditableBookList />
                </div>
            </div>
        )
    }
}

export default withApollo(BookEditList)