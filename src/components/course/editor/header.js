import React from "react"
import { connect } from 'react-redux'
import { Row, Col, Input, Form, Icon, Tooltip } from 'antd';
import CoverImageUploader from 'components/image/cover-image-uploader'
import { updateTitle, updateDescription, updateImageUrl } from 'modules/course/edit/base'
import CourseTagSelectForm from "containers/search/course-tag-form";

const CourseEditHeaderComponent = (props) => {
    return (
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
                        <CourseTagSelectForm />
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>説明&nbsp;
                               <Tooltip title="200文字まで入力できます">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>}
                        validateStatus={props.error.description.status}
                        help={props.error.description.message}
                    >
                        <Input.TextArea
                            value={props.description}
                            autoSize={{ minRows: 3, maxRows: 5 }}
                            style={{ marginTop: '10px' }}
                            placeholder="説明を入力してください"
                            onChange={(e) => props.updateDescription(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

const mapStateToProps = state => ({
    id: state.courseEditBase.title,
    title: state.courseEditBase.title,
    tags: state.courseEditBase.tags,
    imageUrl: state.courseEditBase.imageUrl,
    description: state.courseEditBase.description,
    error: state.courseEditBase.error,
})

const mapDispatchToProps = dispatch => ({
    updateTitle: (title) => dispatch(updateTitle(title)),
    updateImageUrl: (title) => dispatch(updateImageUrl(title)),
    updateDescription: (description) => dispatch(updateDescription(description)),
})

const CourseEditHeader = connect(mapStateToProps, mapDispatchToProps)(CourseEditHeaderComponent)
export default CourseEditHeader