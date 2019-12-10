import React from 'react';
import ReactQuill from 'react-quill';
import { Icon, Affix } from 'antd';
import hljs from 'highlight.js'
import styled from 'styled-components'

const CustomQuill = styled(ReactQuill)`
.ql-container {
    min-height: 300px;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
}
.ql-editor {
    min-height: 300px;
}
.ql-tooltip {
    left: 0px !important;
}
`;

// const CustomButton = () => <span className="octicon octicon-star" />;
hljs.configure({
    // languages: ['python'],
})

const CustomButton = () => <Icon type="youtube" theme="filled" />;

/*
 * Event handler to be attached using Quill toolbar module (see line 73)
 * https://quilljs.com/docs/modules/toolbar/
 */
function insertStar() {
    const cursorPosition = this.quill.getSelection().index;
    // this.quill.insertEmbed(1, 'image', 'https://www.logolynx.com/images/logolynx/ff/ff1a8f176abee68c19015dd9ca472bf2.png');
    // this.quill.insertEmbed(10, 'header', 'hoge');
    // this.quill.insertText(cursorPosition, "<p>hoge</p>");
    this.quill.insertText(cursorPosition, 'hoge', {
        'color': 'black',
        'bold': true
    });
    this.quill.setSelection(cursorPosition + 1);
}

/*
 * Custom toolbar component including insertStar button and dropdowns
 */
const CustomToolbar = () => (
    <div id="toolbar" style={{ backgroundColor: 'white', borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}>
        <select className="ql-header" defaultValue={"ノーマル"} onChange={e => e.persist()}>
            <option value="1">見出し1</option>
            <option value="2">見出し2</option>
            <option value="3">見出し3</option>
            <option selected>ノーマル</option>
        </select>
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
        <select className="ql-color">
            <option value="red" />
            <option value="green" />
            <option value="blue" />
            <option value="orange" />
            <option value="violet" />
            <option value="#d0d1d2" />
            <option selected />
        </select>
        <select className="ql-background">
        </select>
        <button className='ql-list' value='ordered' />
        <button className='ql-list' value='bullet' />
        <button className="ql-script" value="sub" />
        <button className="ql-script" value="super" />
        <button className="ql-clean" />
        <button className="ql-image" />
        <button className="ql-code-block" />
        <button className="ql-blockquote" />
        <button className="ql-link" />
        {/* <button className="ql-youtube" /> */}
        <button className="ql-insertStar">
            <CustomButton />
        </button>
        <select className="ql-align" />
    </div>
);

/* 
 * Editor component with custom toolbar and content containers
 */
class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editorHtml: "" };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(html) {
        this.setState({ editorHtml: html });
    }

    render() {
        return (
            <div className="text-editor">
                <Affix offsetTop={0}>
                    <CustomToolbar />
                </Affix>
                <CustomQuill
                    onChange={this.props.handleChange}
                    placeholder="入力してください。"
                    modules={Editor.modules}
                // formats={Editor.formats}
                // theme={"snow"} // pass false to use minimal theme
                />
            </div>
        );
    }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
    toolbar: {
        container: "#toolbar",
        handlers: {
            insertStar: insertStar,
        }
    },
    clipboard: {
        matchVisual: false,
    },
    syntax: {
        highlight: text => hljs.highlightAuto(text).value,
        // highlight: text => hljs.highlight('java', text).value,
    }
};

export default Editor