import React from "react"
import { connect } from 'react-redux'
import { message, Layout, Button, Row, Col, Affix } from 'antd';
import Logo from "components/logo";
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { createArticleLink } from "utils/link-generator";
import { getErrorMessage } from "utils/error-handle";
const { Header } = Layout;

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const DRAFT_ARTICLE = gql`
mutation DraftArticle($articleInput: ArticleInput!){
  draftArticle(article: $articleInput) {
      id
  }
}
`;

const PUBLISH_ARTICLE = gql`
mutation PublishArticle($articleInput: ArticleInput!){
  publishArticle(article: $articleInput){
      id
  }
}
`;

class EditMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            draftLoading: false,
            publishLoading: false,
        }
    }

    draft = async () => {
        this.setState({ draftLoading: true })
        try {
            const request = this.makeRequest();
            const { data } = await this.props.client.mutate({
                mutation: DRAFT_ARTICLE,
                variables: {
                    articleInput: request
                }
            });

            message.success("下書き保存しました", 7)
            navigate(createArticleLink(data.draftArticle.id))
        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }
        this.setState({ draftLoading: false })
    }

    publish = async () => {
        this.setState({ publishLoading: true })
        try {
            const request = this.makeRequest();
            const { data } = await this.props.client.mutate({
                mutation: PUBLISH_ARTICLE,
                variables: {
                    articleInput: request
                }
            });

            message.success("公開しました", 7)
            navigate(createArticleLink(data.publishArticle.id))
        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }
        this.setState({ publishLoading: false })
    }

    makeRequest = () => {
        if (this.props.error.title.status === 'error' ||
            this.props.error.tags.status === 'error' ||
            this.props.error.blocks.status === 'error') {
            message.error('エラーの項目を確認してください');
        }
        return {
            id: this.props.id,
            title: this.props.title,
            imageUrl: this.props.imageUrl,
            blocks: this.props.blocks.map(b => { return { type: b.type, data: JSON.stringify(b.data) } }),
            tagIds: this.props.tags.map(t => { return t.key }),
            skills: this.props.skills.map(s => { return { id: s.id, level: s.level } })
        }
    }

    validate = () => {

    }

    render() {
        return (
            <Affix offsetTop={0}>
                <Header style={{ background: '#fff', padding: '0px 8px' }}>
                    <div style={{ maxWidth: '740px', width: '100%', margin: '0 auto' }}>
                        <Row>
                            <Col span={11} style={{ textAlign: 'left' }}>
                                <Logo />
                            </Col>
                            <Col span={13} style={{ textAlign: 'right' }}>
                                <Button
                                    style={{ marginLeft: '12px' }}
                                    loading={this.state.draftLoading}
                                    disabled={this.state.publishLoading}
                                    onClick={this.draft}
                                >
                                    下書き
                                </Button>
                                <Button
                                    type="primary"
                                    style={{ marginLeft: '12px' }}
                                    loading={this.state.publishLoading}
                                    disabled={this.state.draftLoading}
                                    onClick={this.publish}
                                >
                                    公開
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Header >
            </Affix>
        )
    }
}


const mapStateToProps = state => ({
    id: state.articleEdit.id,
    title: state.articleEdit.title,
    imageUrl: state.articleEdit.imageUrl,
    blocks: state.articleEdit.blocks,
    tags: state.articleEdit.tags,
    skills: state.articleEdit.skills,
    error: state.articleEdit.error,
})

const ArticleEditMenu = connect(mapStateToProps)(EditMenu)

export default withApollo(ArticleEditMenu)