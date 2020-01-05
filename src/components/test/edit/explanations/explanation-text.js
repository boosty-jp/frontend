import React from 'react';
import { connect } from 'react-redux'
import { Form } from 'antd';
import debounce from "lodash/debounce";
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from 'components/editor/tool'
import { convertToJSX } from 'utils/html-converter'
import { updateText } from 'modules/test/edit/explanation'


class ExplanationEditor extends React.Component {
    constructor(props) {
        super(props);
        this.handleSave = debounce(this.handleSave, 400);
    }

    state = { editorInstance: null, outputs: [] }

    handleSave = async () => {
        try {
            const savedData = await this.state.editorInstance.save();
            const { text, textCount, blockCount } = convertToJSX(savedData.blocks);
            this.props.updateText(text, textCount, blockCount, savedData.blocks);
        } catch (e) {
        }
    }

    render() {
        return (
            <Form.Item
                label={<span>解説内容</span>}
                validateStatus={this.props.error.status}
                help={this.props.error.message}
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
                        tools={EDITOR_JS_TOOLS}
                        instanceRef={instance => this.setState({ editorInstance: instance })}
                        onChange={() => this.handleSave()}
                        onReady={() => this.handleSave()}
                        placeholder="解説を入力してください"
                        data={{ blocks: this.props.blocks }}
                        minHeight={50}
                    />
                </div>
            </Form.Item>
        )
    }
}

const mapStateToProps = state => ({
    blocks: state.testEditExplanation.explanationBlocks,
    error: state.testEditExplanation.error.explanation
})

const mapDispatchToProps = dispatch => ({
    updateText: (text, textCount, blockCount, blocks) => dispatch(updateText(text, textCount, blockCount, blocks)),
})

const ExplanationTextForm = connect(mapStateToProps, mapDispatchToProps)(ExplanationEditor)
export default ExplanationTextForm