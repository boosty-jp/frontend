import React from "react"
import { connect } from 'react-redux'
import { Form, Icon, Tooltip, Row, Col, Input } from 'antd';
import CoverImageUploader from 'components/image/cover-image-uploader'
import { updateTitle, updateImageUrl } from 'modules/article/edit'
import ArticleTagSelectForm from "containers/search/article-tag-form";
import ArticleSkillForm from 'components/article/edit/skill-form'

const ArticleEditHeaderComponent = (props) => {
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={8} lg={6} xl={6} style={{ textAlign: 'left' }}>
                    <Form>
                        <Form.Item
                            label={
                                <span >サムネイル画像&nbsp;
                                    <Tooltip title="2MB以下の画像を投稿できます。サムネイル画像は16:9をトリミングしたものに変換されます。">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            }
                        >
                            <CoverImageUploader imageUrl={props.imageUrl} onComplete={props.updateImageUrl} />
                        </Form.Item>
                    </Form>
                </Col>
                <Col xs={24} sm={24} md={16} lg={18} xl={18} style={{ textAlign: 'left' }}>
                    <Form>
                        <Form.Item
                            label={
                                <span>タイトル&nbsp;
                               <Tooltip title="60文字まで入力できます">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>}
                            validateStatus={props.error.title.status}
                            help={props.error.title.message}
                        >
                            <Input
                                size="large"
                                value={props.title}
                                placeholder="タイトルを入力してください"
                                onChange={(e) => props.updateTitle(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label={
                                <span>ハッシュタグ&nbsp;
                               <Tooltip title="5つまで入力できます">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>}
                            validateStatus={props.error.tags.status}
                            help={props.error.tags.message}
                        >
                            <ArticleTagSelectForm />
                        </Form.Item>
                        <Form.Item
                            label={
                                <span>スキル&nbsp;
                               <Tooltip title="3つまで入力できます">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>}
                        >
                            <ArticleSkillForm />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = state => ({
    title: state.articleEdit.title,
    imageUrl: state.articleEdit.imageUrl,
    error: state.articleEdit.error,
})

const mapDispatchToProps = dispatch => ({
    updateTitle: (title) => dispatch(updateTitle(title)),
    updateImageUrl: (imageUrl) => dispatch(updateImageUrl(imageUrl)),
})

const ArticleEditHeader = connect(mapStateToProps, mapDispatchToProps)(ArticleEditHeaderComponent)
export default ArticleEditHeader