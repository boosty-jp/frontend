import React from 'react';
import { connect } from 'react-redux'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { message, Row, Col, Affix, Button } from 'antd';
import PageEditForm from 'components/book/edit/page/edit-form';
import PagePreviewContent from 'components/book/edit/page/preview';
import { EditOutlined, EyeOutlined, SaveOutlined } from '@ant-design/icons';
import { editPage, previewPage, savePage } from 'modules/page/edit'
import { updatePageTitle } from 'modules/book/edit'
import { getTitleError, getTextError } from "utils/content-validator";
import { getErrorMessage } from "utils/error-handle";

const buttonStyle = {
    marginBottom: '10px',
    maxWidth: '200px',
    display: 'block',
    width: '100%'
}

const SAVE_PAGE = gql`
mutation SavePage($bookId: ID!, $pageId: ID!, $pageInput: PageInput!){
  savePage(bookId: $bookId, pageId: $pageId, page: $pageInput)
}
`;

class PagePreviewHandlerComponent extends React.Component {
    state = {
        loading: false,
    }
    save = async () => {
        this.setState({ loading: true })
        try {
            const request = this.makeRequest();
            await this.props.client.mutate({
                mutation: SAVE_PAGE,
                variables: {
                    bookId: this.props.bookId,
                    pageId: this.props.id,
                    pageInput: request
                }
            });

            message.success("保存しました", 7)
            this.props.updatePageTitle(this.props.id, this.props.title);
            this.props.savePage();
        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }
        this.setState({ loading: false })
    }

    makeRequest = () => {
        const titleError = getTitleError(this.props.title);
        const textError = getTextError(this.props.text);

        if (titleError.status === 'error') {
            throw new Error(titleError.message);
        } else if (textError.status === 'error') {
            throw new Error(textError.message);
        }

        return {
            title: this.props.title,
            text: this.props.text,
        }
    }

    render() {
        return (
            <Row>
                <Col xs={24} sm={24} md={24} lg={20} xl={19} xxl={19} style={{ padding: '20px', zIndex: 100 }}>
                    {this.props.previewMode ?
                        <PagePreviewContent />
                        :
                        <PageEditForm />
                    }
                </Col>
                <Col xs={24} sm={24} md={24} lg={4} xl={5} xxl={5}>
                    <Affix offsetTop={60}>
                        <Button
                            shape="round"
                            type="primary"
                            onClick={this.save}
                            style={buttonStyle}
                            loading={this.state.loading}
                            disabled={this.props.saved}
                        >
                            <SaveOutlined />保存する
                        </Button>
                        {this.props.previewMode ?
                            <Button
                                shape="round"
                                style={buttonStyle}
                                onClick={this.props.editPage}
                            >
                                <EditOutlined />編集する
                            </Button>
                            :
                            <Button
                                shape="round"
                                style={buttonStyle}
                                onClick={this.props.previewPage}
                            >
                                <EyeOutlined />プレビュー
                            </Button>
                        }
                    </Affix>
                </Col>
            </Row >
        )
    }
}

const mapStateToProps = state => ({
    id: state.pageEdit.id,
    title: state.pageEdit.title,
    text: state.pageEdit.text,
    previewMode: state.pageEdit.previewMode,
    saved: state.pageEdit.saved
})

const mapDispatchToProps = dispatch => ({
    previewPage: () => dispatch(previewPage()),
    editPage: () => dispatch(editPage()),
    savePage: () => dispatch(savePage()),
    updatePageTitle: (pageId, title) => dispatch(updatePageTitle(pageId, title)),
})

const PagePreviewHandler = connect(mapStateToProps, mapDispatchToProps)(PagePreviewHandlerComponent)
export default withApollo(PagePreviewHandler)