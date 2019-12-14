import React from "react"
import { connect } from 'react-redux'
import { Row, Col, Input } from 'antd';
import CoverImageUploader from 'components/article/edit/cover-image-uploader'
import { updateTitle } from 'modules/article/edit'
import ArticleTagSelectForm from "containers/search/article-tag-form";
import ArticleSkillForm from 'components/article/edit/skill-form'

const ArticleEditHeaderComponent = (props) => {
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={8} lg={6} xl={6} style={{ textAlign: 'left' }}>
                    <CoverImageUploader />
                </Col>
                <Col xs={24} sm={24} md={16} lg={18} xl={18} style={{ textAlign: 'left' }}>
                    <span style={{ fontWeight: '400', fontSize: '16px' }}>タイトル: </span>
                    <Input
                        size="large"
                        value={props.title}
                        placeholder="タイトルを入力してください"
                        style={{ marginTop: '10px', marginBottom: '20px' }}
                        onChange={(e) => props.updateTitle(e.target.value)}
                    />
                    <span style={{ fontWeight: '400', fontSize: '16px' }}>ハッシュタグ: </span>
                    <ArticleTagSelectForm />
                    <div style={{ marginTop: '20px' }}>
                        <ArticleSkillForm />
                    </div>
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = state => ({
    title: state.articleEdit.title,
})

const mapDispatchToProps = dispatch => ({
    updateTitle: (title) => dispatch(updateTitle(title)),
})

const ArticleEditHeader = connect(mapStateToProps, mapDispatchToProps)(ArticleEditHeaderComponent)
export default ArticleEditHeader