import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "components/editor/tool/code";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import Paragraph from "@editorjs/paragraph";
import SimpleImage from '@editorjs/simple-image'
import { image } from 'components/editor/tool/image'

export const EDITOR_JS_TOOLS = {
    header: {
        class: Header,
        toolbox: {
            title: '見出し'
        }
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        toolbox: {
            title: 'テキスト'
        }
    },
    table: {
        class: Table,
        inlineToolbar: true,
        toolbox: {
            title: '表'
        }
    },
    list: {
        class: List,
        inlineToolbar: true,
        toolbox: {
            title: 'リスト'
        }
    },
    code: {
        class: Code,
        toolbox: {
            title: 'コード'
        }
    },
    image: image,
    quote: {
        class: Quote,
        inlineToolbar: true,
        config: {
            quotePlaceholder: '引用内容を入力してください',
            captionPlaceholder: '引用元を入力してください',
        },
        toolbox: {
            title: '引用'
        }
    },
    embed: {
        class: Embed,
        config: {
            services: {
                youtube: true,
                codepen: true,
                codesandbox: {
                    regex: /https?:\/\/codesandbox.io\/([^/?&]*)\/([^/?&]*)/,
                    embedUrl: 'https://codesandbox.io/<%= remote_id %>?fontsize=14&hidenavigation=1&theme=dark',
                    html: "<iframe style='width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;' allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb' sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'></iframe>",
                    height: 300,
                    width: 600,
                    id: (groups) => { return 'embed/' + groups[1] }
                },
            }
        },
        inlineToolbar: true,
    },
    Marker: {
        class: Marker,
    },
    inlineCode: {
        class: InlineCode,
    },
    warning: {
        class: Warning,
        inlineToolbar: true,
        config: {
            titlePlaceholder: 'タイトル',
            messagePlaceholder: '内容',
        },
        toolbox: {
            title: '補足情報',
        }
    },
    imageUrl: {
        class: SimpleImage,
    }
};
