import React from 'react'
import SimpleMDE from 'react-simplemde-editor'
import MarkdownRender from 'components/editor/renderer'
// import { uploadImageToS3 } from 'services/user/image'
// import MarkdownHelp from 'components/markdown/help'

export default class MarkdownEditor extends React.Component {
    constructor(props) {
        super(props);
        const toolIcons = [
            "bold",
            "italic",
            "strikethrough",
            "heading-1",
            "heading-2",
            "heading-3",
            "|",
            "code",
            "quote",
            "unordered-list",
            "ordered-list",
            "link",
            "image",
            {
                name: "upload-image",
                action: this.uploadImage,
                className: "fa fa-file-image-o",
                title: "画像アップロード"
            },
            "table",
            "|",
            "preview",
            {
                name: "guide",
                action: this.openHelp,
                className: "fa fa-question-circle",
                title: "ヘルプ"
            },
        ]

        this.state = {
            id: props.id,
            number: props.number,
            value: props.value,
            isUpdate: props.isUpdate,
            toolIcons: toolIcons,
            helpModalOn: false
        }
    }

    openHelp = () => {
        this.setState({ helpModalOn: true })
    }
    uploadImage = (editor) => {
        var _input_id = "simple-mde-image-uploader" + Math.random();

        var _history = document.getElementById(_input_id);
        if (_history) {
            editor.options.element.parentNode.removeChild(_history);
        }

        var _html = document.createElement("input");
        _html.setAttribute("type", "file");
        _html.setAttribute("accept", "image/gif,image/jpeg,image/jpg,image/png,image/svg");
        _html.setAttribute("id", _input_id);
        _html.setAttribute("style", "display:none");

        editor.options.element.parentNode.appendChild(_html);

        var _input = document.getElementById(_input_id);

        _input.onchange = (e) => {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const request = {
                    body: {
                        image: reader.result.replace(/^.*,/, ''),
                    }
                }
                // uploadImageToS3(request).then((res) => {
                //     editor.codemirror.replaceSelection("![uploadedImage.png](" + res.imageUrl + ")");
                // }).catch((err) => {
                // })
            });
            reader.readAsDataURL(e.target.files[0]);
            editor.options.element.parentNode.removeChild(_input);
        };

        if (document.all) {
            _input.click();
        } else {
            var e = document.createEvent("MouseEvents");
            e.initEvent("click", false, true);
            _input.dispatchEvent(e);
        }
    }

    render() {
        const addSectionTextHandler = (value) => {
            // if (this.state.isUpdate) {
            //     this.props.updateSectionText(this.state.id, this.state.number, value);
            // } else {
            //     this.props.addSectionText(this.state.number, value);
            // }
        }

        return (
            <>
                <SimpleMDE
                    value={this.state.value}
                    onChange={(value) => addSectionTextHandler(value)}
                    options={{
                        spellChecker: false,
                        hideIcons: [],
                        // showIcons: ["strikethrough", "code", "table"],
                        toolbar: this.state.toolIcons,
                        // toolbar: [],
                        status: false,
                        renderingConfig: {
                            singleLineBreaks: true,
                            codeSyntaxHighlighting: true,
                        },
                        previewRender: function (plainText) {
                            // return MarkdownRender.render(plainText);
                            const previewHTML = "<div class=\"article-section-markdown\" style=\"overflow: auto;\">" + MarkdownRender.render(plainText) + "</div>"
                            return previewHTML;
                        }
                    }}
                />
                {/* <MarkdownHelp open={this.state.helpModalOn} onClose={() => { this.setState({ helpModalOn: false }) }} /> */}
            </>
        )
    }
}