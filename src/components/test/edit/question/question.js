import React from 'react';
import { connect } from 'react-redux'
import { Form } from 'antd';
import debounce from "lodash/debounce";
import EditorJs from 'react-editor-js';
import { EDITOR_QUESTION_TOOLS } from 'components/editor/question-tool'
import { convertToJSX } from 'utils/html-converter'
import { updateQuestion } from 'modules/test/edit/question'


class QuestionStatementEditor extends React.Component {
    constructor(props) {
        super(props);
        this.handleSave = debounce(this.handleSave, 400);
    }

    state = { editorInstance: null, outputs: [] }

    handleSave = async () => {
        try {
            const savedData = await this.state.editorInstance.save();
            const { text, textCount, blockCount } = convertToJSX(savedData.blocks);
            this.props.updateQuestion(text, textCount, blockCount, savedData.blocks);
        } catch (e) {
        }
    }

    render() {
        return (
            <Form.Item
                label={<span>問題内容</span>}
                validateStatus={this.props.error.question.status}
                help={this.props.error.question.message}
            >
                <div
                    style={{
                        border: '1px solid #d9d9d9',
                        borderRadius: '0.5rem',
                        padding: '10px'
                    }}
                >
                    <EditorJs
                        // enableReInitialize
                        tools={EDITOR_QUESTION_TOOLS}
                        instanceRef={instance => this.setState({ editorInstance: instance })}
                        onChange={() => this.handleSave()}
                        onReady={() => this.handleSave()}
                        placeholder="問題内容を入力してください"
                        data={{ blocks: this.props.questionBlocks }}
                        minHeight={50}
                    />
                </div>
            </Form.Item>
        )
    }
}

const mapStateToProps = state => ({
    questionBlocks: state.testEditQuestion.questionBlocks,
    questionText: state.testEditQuestion.questionText,
    questionTextCount: state.testEditQuestion.questionTextCount,
    questionBlockCount: state.testEditQuestion.questionBlockCount,
    error: state.testEditQuestion.error,
})

const mapDispatchToProps = dispatch => ({
    updateQuestion: (text, textCount, blockCount, blocks) => dispatch(updateQuestion(text, textCount, blockCount, blocks)),
})

const QuestionStatementForm = connect(mapStateToProps, mapDispatchToProps)(QuestionStatementEditor)
export default QuestionStatementForm