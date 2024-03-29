import React from "react"
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import { message, Button, Modal } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import { getErrorMessage } from "utils/error-handle"
import NeedLoginComponent from "components/auth/need-login";
import { isLoggedIn } from "services/local-user";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const ADD_BOOK_SHELF = gql`
mutation AddBookShelf($bookId: ID!){
  addBookShelf(bookId: $bookId)
}
`;

class AddButtonComponent extends React.Component {
    state = { loading: false, loginModalVisible: false }

    handleSubmit = (ev) => {
        ev.preventDefault();
        this.setState({ loading: true })

        this.props.client.mutate({
            mutation: ADD_BOOK_SHELF,
            variables: {
                bookId: this.props.id,
            }
        }).then(() => {
            message.info("本棚に追加しました", 10);
            this.setState({ loading: false });
            navigate("/book/own");
        }).catch((err) => {
            message.error(getErrorMessage(err), 10);
            this.setState({ loading: false });
        });
    };

    handleClick = (e) => {
        if (!isLoggedIn()) {
            this.setState({ loginModalVisible: true });
            return;
        }
        this.handleSubmit(e);
    }

    render() {
        return (
            <>
                <Button
                    block
                    shape="round"
                    size="large"
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={this.handleClick}
                    loading={this.state.loading}
                    style={{ boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }}
                >本棚に追加する</Button >
                <Modal
                    closable
                    footer={null}
                    visible={this.state.loginModalVisible}
                    onCancel={() => this.setState({ loginModalVisible: false })}
                >
                    <NeedLoginComponent message="本棚のご利用はログインが必要です" />
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => ({
    id: state.bookView.id,
})

const AddButton = connect(mapStateToProps)(AddButtonComponent);
export default withApollo(AddButton)