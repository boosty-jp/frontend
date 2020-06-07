import React from 'react'
import { Drawer, message, notification } from 'antd';
import SimpleMDE from 'react-simplemde-editor'
import MarkdownRender from 'utils/markdown/markdown-renderer'
import MarkdownHelp from 'components/editor/help'
import getFirebase from "utils/firebase";
import uuidv4 from 'uuid/v4'
import _ from 'lodash';

export default class MarkdownEditor extends React.Component {
    constructor(props) {
        super(props);
        const toolIcons = [
            "heading-1",
            "heading-2",
            "heading-3",
            "bold",
            "italic",
            "strikethrough",
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
                name: "side-by-side",
                action: editor => {
                    editor.toggleSideBySide();
                    this.setState({ splited: !this.state.splited });
                },
                className: "fa fa-columns",
                title: "2画面表示(F9)"
            },
            {
                name: "fullscreen",
                action: editor => {
                    editor.toggleFullScreen();
                    this.setState({ splited: false });
                },
                className: "fa fa-arrows-alt",
                title: "全画面表示"
            },
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
            helpOpen: false,
            perfomanceIssueCount: 0,
            splited: false,
        }
    }
    toggleSplitScreen = () => {
        this.setState({ splitScreen: !this.state.splitScreen });
    }

    openHelp = () => {
        this.setState({ helpOpen: true })
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
            const loadMessageHide = message.loading('アップロード中です..', 100);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const firebase = getFirebase();
                const file = e.target.files[0];
                const metadata = {
                    contentType: file.type
                }
                firebase.auth().onAuthStateChanged(async (user) => {
                    if (!user) {
                        message.error("ログインが必要です");
                    } else {
                        const fileName = 'page-content-' + uuidv4();
                        const storageRef = await firebase.storage().ref()
                        const imgFile = storageRef.child(`user/${user.uid}/${fileName}.png`)

                        try {
                            const image = await imgFile.put(file, metadata);
                            const imageUrl = "https://firebasestorage.googleapis.com/v0/b/" + image.metadata.bucket + "/o/" + encodeURIComponent(image.metadata.fullPath) + "?alt=media";
                            editor.codemirror.replaceSelection("![uploadedImage.png](" + imageUrl + ")");
                            message.info("アップロードしました");
                        } catch (e) {
                            message.error("アップロードに失敗しました");
                        }
                        setTimeout(loadMessageHide, 0);
                    }
                })

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
        return (
            <>
                <SimpleMDE
                    value={this.props.value}
                    onChange={(value) => this.props.updateText(value)}
                    options={{
                        spellChecker: false,
                        hideIcons: [],
                        toolbar: this.state.toolIcons,
                        status: false,
                        renderingConfig: {
                            singleLineBreaks: true,
                            codeSyntaxHighlighting: true,
                        },
                        previewRender: _.throttle((plainText) => {
                            const startTime = Date.now(); // 開始時間
                            const previewHTML = "<div class=\"article-section-markdown book-page-body\" style=\"overflow: auto;\">" + MarkdownRender.render(plainText) + "</div>"
                            const endTime = Date.now(); // 終了時間

                            if (this.state.splited && endTime - startTime > 250) {
                                this.setState({ perfomanceIssueCount: this.state.perfomanceIssueCount + 1 });
                                if (this.state.perfomanceIssueCount == 5) {
                                    notification.warning({
                                        message: `描画速度が遅くなっています`,
                                        description: '2画面での編集は通常よりパフォーマンスを必要とします。快適に編集いただくには、2画面表示から1画面での編集をすることをおすすめします。',
                                        placement: 'bottomRight',
                                        duration: 0
                                    });
                                }
                            }
                            return previewHTML;
                        }, 150, { leading: true, trailing: false })
                    }}
                />
                {this.state.splitScreen &&
                    <div className="article-section-markdown book-page-body" style={{ overflow: 'auto' }}>
                        <div dangerouslySetInnerHTML={{ __html: MarkdownRender.render(this.props.value) }} />
                    </div>
                }
                <Drawer
                    title="Markdownの書き方"
                    width={850}
                    onClose={() => this.setState({ helpOpen: false })}
                    visible={this.state.helpOpen}
                >
                    <MarkdownHelp />
                </Drawer>
            </>
        )
    }
}