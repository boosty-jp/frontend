import React from "react"
import { connect } from 'react-redux'
import { message, Layout, Row, Col, Affix } from 'antd';
import Logo from "components/logo";
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { createBookSectionsEditLink } from "utils/link-generator";
import { getErrorMessage } from "utils/error-handle";
import SimpleShadowButton from "components/button/simple-shadow";
import { getTitleError, getTextError } from "utils/content-validator";
import { SaveOutlined } from '@ant-design/icons'
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
            <Affix offsetTop={0}>
                <Header style={{ background: '#fff', padding: '0px 8px' }}>
                    <div style={{ maxWidth: '900px', width: '100%', margin: '0 auto', padding: '0 20px' }}>
                        <Row>
                            <Col span={13} style={{ textAlign: 'left' }}>
                                <Logo noLink={true} />
                            </Col>
                            <Col span={11} style={{ textAlign: 'right' }}>
                                <SimpleShadowButton
                                    text="保存"
                                    icon={<SaveOutlined />}
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
    text: state.pageEdit.text,
})

const PageEditMenu = connect(mapStateToProps)(EditMenu)

export default withApollo(PageEditMenu)