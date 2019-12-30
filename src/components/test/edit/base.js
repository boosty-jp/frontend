import React from "react"
import { connect } from 'react-redux'
import { Form, Icon, Tooltip, Input } from 'antd';
import { updateTitle, updateDescription } from 'modules/test/edit/base'
import ReferenceCourseForm from "./reference-course-form";

const TestEditBaseComponent = (props) => {
    return (
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
                    <span>出題対象のコース&nbsp;
                        <Tooltip title="公開されているコースのみ指定できます">
                            <Icon type="question-circle-o" />
                        </Tooltip>
                    </span>}
            >
                <ReferenceCourseForm />
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
    )
}

const mapStateToProps = state => ({
    title: state.testEditBase.title,
    description: state.testEditBase.description,
    error: state.testEditBase.error,
})

const mapDispatchToProps = dispatch => ({
    updateTitle: (title) => dispatch(updateTitle(title)),
    updateDescription: (description) => dispatch(updateDescription(description)),
})

const TestEditBase = connect(mapStateToProps, mapDispatchToProps)(TestEditBaseComponent)
export default TestEditBase