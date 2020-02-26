import React from "react"
import { connect } from 'react-redux'
import { message, Layout, Row, Col, Affix } from 'antd';
import Logo from "components/logo";
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { createBookSectionsEditLink } from "utils/link-generator";
import { getErrorMessage } from "utils/error-handle";
import SimpleShadowButton from "components/button/simple-shadow";
import { getTitleError, getBlocksError, getBlockTextError } from "utils/content-validator";
const { Header } = Layout;

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const SAVE_PAGE = gql`
mutation SavePage($bookId: ID!, $pageId: ID!, $pageInput: PageInput!){
  savePage(bookId: $bookId, pageId: $pageId, page: $pageInput)
}
`;

class EditMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
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
            navigate(createBookSectionsEditLink(this.props.bookId))
        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }
        this.setState({ loading: false })
    }

    makeRequest = () => {
        const titleError = getTitleError(this.props.title);
        const blocksError = getBlocksError(this.props.blocks);
        const textCountError = getBlockTextError(this.props.textCount);
        if (titleError.status === 'error') {
            throw new Error(titleError.message);
        } else if (blocksError.status === 'error') {
            throw new Error(blocksError.message);
        } else if (textCountError.status === 'error') {
            throw new Error(textCountError.message);
        }

        return {
            title: this.props.title,
            rawTexts: this.props.rawTexts,
            blocks: this.props.blocks.map(b => { return { type: b.type, data: JSON.stringify(b.data) } }),
        }
    }

    render() {
        return (
            <Affix offsetTop={0}>
                <Header style={{ background: '#fff', padding: '0px 8px' }}>
                    <div style={{ maxWidth: '900px', width: '100%', margin: '0 auto', padding: '0 20px' }}>
                        <Row>
                            <Col span={13} style={{ textAlign: 'left' }}>
                                <Logo />
                            </Col>
                            <Col span={11} style={{ textAlign: 'right' }}>
                                <SimpleShadowButton
                                    text="保存"
                                    icon="save"
                                    color="#1890ff"
                                    loading={this.state.loading}
                                    onClick={this.save}
                                />
                            </Col>
                        </Row>
                    </div>
                </Header >
            </Affix>
        )
    }
}


const mapStateToProps = state => ({
    id: state.pageEdit.id,
    title: state.pageEdit.title,
    rawTexts: state.pageEdit.rawTexts,
    blocks: state.pageEdit.blocks,
    textCount: state.pageEdit.textCount,
})

const PageEditMenu = connect(mapStateToProps)(EditMenu)

export default withApollo(PageEditMenu)