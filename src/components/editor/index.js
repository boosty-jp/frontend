import React from 'react';
import { connect } from 'react-redux'
import debounce from "lodash/debounce";
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from 'components/editor/tool'
import { Typography } from 'antd';
import { convertToJSX } from 'utils/html-converter'
import { updateText } from 'modules/article/edit'

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.handleSave = debounce(this.handleSave, 400);
    }

    state = { editorInstance: null, outputs: [] }

    handleSave = async () => {
        const savedData = await this.state.editorInstance.save();
        const { text, textCount, blockCount } = convertToJSX(savedData.blocks);
        this.props.updateText(text, textCount, blockCount, savedData.blocks);
    }

    render() {
        return (
            <>
                <Typography>
                    {this.state.outputs.map((o => o))}
                </Typography>
                <EditorJs
                    // enableReInitialize
                    tools={EDITOR_JS_TOOLS}
                    instanceRef={instance => this.setState({ editorInstance: instance })}
                    onChange={() => this.handleSave()}
                    onReady={() => this.handleSave()}
                    placeholder="記事の内容を入力してください"
                    data={{ blocks: this.props.blocks }}
                />
            </>
        )
    }
}

const mapStateToProps = state => ({
    blocks: state.articleEdit.blocks,
})

const mapDispatchToProps = dispatch => ({
    updateText: (text, textCount, blockCount, blocks) => dispatch(updateText(text, textCount, blockCount, blocks)),
})

const ArticleEditor = connect(mapStateToProps, mapDispatchToProps)(Editor)
export default ArticleEditor