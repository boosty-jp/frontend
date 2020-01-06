import React from 'react';
import { connect } from 'react-redux'
import { Form, Icon, Radio } from 'antd';
import SelectForm from 'components/test/edit/question/select'
import TextForm from 'components/test/edit/question/text'
import QuestionStatementForm from 'components/test/edit/question/question'
import { updateType } from 'modules/test/edit/question'

const QuestionFormComponent = (props) => {
    return (
        <>
            <Form>
                <QuestionStatementForm />

                <Form.Item
                    label={<span>回答形式</span>}
                    validateStatus={props.error.type.status}
                    help={props.error.type.message}
                >
                    <Radio.Group
                        value={props.type}
                        buttonStyle="solid"
                        onChange={(e) => props.updateType(e.target.value)}
                    >
                        <Radio.Button value="select"><Icon type="unordered-list" style={{ marginRight: '8px' }} />選択</Radio.Button>
                        <Radio.Button value="text"><Icon type="highlight" style={{ marginRight: '8px' }} />記述</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                {props.type === 'select' && <SelectForm />}
                {props.type === 'text' && <TextForm />}
                <div style={{ height: '30px' }}>
                </div>
            </Form>
        </>
    );
}

const mapStateToProps = state => ({
    type: state.testEditQuestion.type,
    error: state.testEditQuestion.error,
})

const mapDispatchToProps = dispatch => ({
    updateType: (type) => dispatch(updateType(type)),
})

const QuestionForm = connect(mapStateToProps, mapDispatchToProps)(QuestionFormComponent)
export default QuestionForm