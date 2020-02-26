import React from 'react';
import { connect } from 'react-redux'
import debounce from "lodash/debounce";
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from 'components/editor/tool'
import { convertToJSX } from 'utils/html-converter'
import { updateText } from 'modules/page/edit'

class Editor extends React.Component {
    constructor(props) {
        super(props);
        // this.handleSave = debounce(this.handleSave, 10);
    }

    state = { editorInstance: null, outputs: [] }

    handleSave = async () => {
        try {
            const savedData = await this.state.editorInstance.save();
            const { text, rawTexts, textCount, blockCount, anchors } = convertToJSX(savedData.blocks);
            this.props.updateText(text, rawTexts, anchors, textCount, blockCount, savedData.blocks);
        } catch (e) {
        }
    }

    render() {
        return (
            <EditorJs
                tools={EDITOR_JS_TOOLS}
                instanceRef={instance => this.setState({ editorInstance: instance })}
                onChange={() => this.handleSave()}
                onReady={() => console.log(this.state.editorInstance)}
                placeholder="内容を入力してください"
                data={{ blocks: this.props.blocks }}
                minHeight={250}
                logLevel="ERROR"
                enableReInitialize={this.props.loading}
            />
        )
    }
}

const mapStateToProps = state => ({
    blocks: state.pageEdit.blocks,
    loading: state.pageEdit.loading,
})

const mapDispatchToProps = dispatch => ({
    updateText: (text, rawTexts, anchors, textCount, blockCount, blocks) => dispatch(updateText(text, rawTexts, anchors, textCount, blockCount, blocks)),
})

const PageEditor = connect(mapStateToProps, mapDispatchToProps)(Editor)
export default PageEditor