import React from "react"
import { connect } from 'react-redux'
import { Form, Icon, Tooltip, Row, Col, Input } from 'antd';
import CoverImageUploader from 'components/article/edit/cover-image-uploader'
import { updateTitle } from 'modules/article/edit'
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
                                <span >カバー画像&nbsp;
                                    <Tooltip title="1MB以下の画像を投稿できます">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            }
                        >
                            <CoverImageUploader />
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
    error: state.articleEdit.error,
})

const mapDispatchToProps = dispatch => ({
    updateTitle: (title) => dispatch(updateTitle(title)),
})

const ArticleEditHeader = connect(mapStateToProps, mapDispatchToProps)(ArticleEditHeaderComponent)
export default ArticleEditHeader