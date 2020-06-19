import React from 'react';
import { withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import gql from 'graphql-tag';
import { message, Button } from 'antd';
import { getErrorMessage } from "utils/error-handle";
import { createPageEditLink } from 'utils/link-generator'
import { PlusOutlined } from '@ant-design/icons';
import { addPage } from "modules/book/edit";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const CREATE_PAGE = gql`
mutation createPage($bookId: ID!, $sectionId: ID!) {
  createPage(bookId: $bookId, sectionId: $sectionId) {
    id
  }
}
`;

class AddPageButton extends React.Component {
    state = { loading: false };

    createPage = async () => {
        if (!this.props.saved) {
            if (typeof window) {
                if (!window.confirm("現在の編集内容を保存せずに新しいページを作成し、ページ移動をしますか？")) {
                    return;
                }
            }
        }

        if (this.props.pages.length >= 20) {
            message.error("作成できるページは1セクションにつき20までです", 7)
            return;
        }
        this.setState({ loading: true });
        try {
            const { data } = await this.props.client.mutate({
                mutation: CREATE_PAGE,
                variables: {
                    bookId: this.props.bookId,
                    sectionId: this.props.sectionId
                }
            });
            this.props.addPage(this.props.sectionId, data.createPage.id);
            navigate(createPageEditLink(data.createPage.id, this.props.bookId));
            this.setState({ loading: false });
        } catch (err) {
            message.error(getErrorMessage(err), 7);
            this.setState({ loading: false });
        }
    };

    render() {
        return (
            <>
                <Button
                    block
                    icon={<PlusOutlined />}
                    onClick={this.createPage}
                    loading={this.state.loading}
                    disabled={this.props.pages.length >= 20}
                    shape={this.props.pageEdit ? "round" : ""}
                    type={this.props.pageEdit ? "default" : "primary"}
                >
                    ページ追加
                </Button>
            </>
        );
    }
}

const mapStateToProps = state => ({
    saved: state.pageEdit.saved
})

const mapDispatchToProps = dispatch => ({
    addPage: (sectionId, pageId) => dispatch(addPage(sectionId, pageId)),
})

export default withApollo(connect(mapStateToProps, mapDispatchToProps)(AddPageButton));