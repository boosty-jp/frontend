import React from "react"
import { connect } from 'react-redux'
import { Row, Col, Input } from 'antd';
import CourseCoverImageUploader from 'components/course/editor/cover-image-uploader'
import { updateTitle, updateDescription } from 'modules/course/edit/base'
import CourseTagSelectForm from "containers/search/course-tag-form";

const CourseEditHeaderComponent = ({ title, description, updateTitle, updateDescription }) => {
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={8} lg={6} xl={6} style={{ textAlign: 'left' }}>
                    <CourseCoverImageUploader />
                </Col>
                <Col xs={24} sm={24} md={16} lg={18} xl={18}>
                    <div>
                        <p style={{ fontWeight: '400', fontSize: '16px', margin: '0px' }}>タイトル: </p>
                        <Input
                            size="large"
                            value={title}
                            placeholder="タイトルを入力してください"
                            style={{ marginTop: '10px' }}
                            onChange={(e) => {
                                updateTitle(e.target.value)
                            }}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <p style={{ fontWeight: '400', fontSize: '16px', margin: '0px' }}>ハッシュタグ: </p>
                        <div style={{ marginTop: '10px' }}>
                            <CourseTagSelectForm />
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <p style={{ fontWeight: '400', fontSize: '16px', margin: '0px' }}>説明: </p>
                        <Input.TextArea
                            value={description}
                            autoSize={{ minRows: 3, maxRows: 5 }}
                            style={{ marginTop: '10px' }}
                            placeholder="説明を入力してください"
                            onChange={(e) => updateDescription(e.target.value)}
                        />
                    </div>
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = state => ({
    id: state.courseEditBase.title,
    tags: state.courseEditBase.tags,
    title: state.courseEditBase.title,
    description: state.courseEditBase.description,
})

const mapDispatchToProps = dispatch => ({
    updateTitle: (title) => dispatch(updateTitle(title)),
    updateDescription: (description) => dispatch(updateDescription(description)),
})

const CourseEditHeader = connect(mapStateToProps, mapDispatchToProps)(CourseEditHeaderComponent)
export default CourseEditHeader