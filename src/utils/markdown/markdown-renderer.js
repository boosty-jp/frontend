import { Remarkable } from 'remarkable';
import { linkify } from 'remarkable/linkify';
import uuidv4 from 'uuid/v4'
import hljs from 'highlight.js';
import Clipboard from 'clipboard';
import { escapeHtml, replaceEntities, unescapeMd } from 'utils/markdown/escape-html'
import { toLangTagString } from "utils/markdown/file-lang-tag-creator"

var MarkdownViewer = new Remarkable('full', {
    html: false,        // Enable HTML tags in source
    xhtmlOut: false,        // Use '/' to close single tags (<br />)
    breaks: true,        // Convert '\n' in paragraphs into <br>
    langPrefix: 'hljs language-',  // CSS language prefix for fenced blocks
    langDefault: 'unknown',
    linkTarget: '',           // set target to open link in
    // Enable some language-neutral replacements + quotes beautification
    typographer: false,


    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
    quotes: '“”‘’',

    // Highlighter function. Should return escaped HTML,
    // or '' if input not changed
    highlight: function (str, codeInfo) {
        const arr = codeInfo.split(':');
        const lang = arr[0];
        const fileName = arr[1];

        let fileTag = fileName ? "<div><div class=\"markdown-code-file-name\"><span>" + fileName + "</span></div></div>" : "";
        let langTag = toLangTagString(lang);
        let codeTag = "";

        try {
            if (lang && hljs.getLanguage(lang)) {
                codeTag = hljs.highlight(lang, str).value;
            } else {
                codeTag = hljs.highlightAuto(str).value;
            }
        } catch (__) {
            return "";
        }

        // const copyButton = "<button class=\"code-clip-board-btn\" data-clipboard-text=\"" + escape_html(str) + "\">" + ReactDOMServer.renderToStaticMarkup(<FaRegCopy className="code-clip-board-icon" size={18} />) + "</button>"
        const id = uuidv4();
        const copyButton = "<button class=\"code-clip-board-btn\" data-clipboard-text=\"" + escape_html(str) + "\"><input type=\"checkbox\" class=\"code-clip-board-icon\" id=\"" + id + "\"/><label for=\"" + id + "\">copy</label></button>"

        return fileTag + langTag + copyButton + "<div class=\"markdown-code-content\">" + codeTag + "</div>";
    }
});

function escape_html(string) {
    if (typeof string !== 'string') {
        return string;
    }
    return string.replace(/[&'`"<>]/g, function (match) {
        return {
            '&': '&amp;',
            "'": '&#x27;',
            '`': '&#x60;',
            '"': '&quot;',
            '<': '&lt;',
            '>': '&gt;',
        }[match]
    });
}

MarkdownViewer.renderer.rules.hr = function (tokens, idx, options /*, env */) {
    return '<div class="ant-divider ant-divider-horizontal" role="separator"></div>';
};

MarkdownViewer.renderer.rules.image = function (tokens, idx, options /*, env */) {
    var src = ' src="' + escapeHtml(tokens[idx].src) + '"';
    var title = tokens[idx].title ? (' title="' + escapeHtml(replaceEntities(tokens[idx].title)) + '"') : '';
    var alt = ' alt="' + (tokens[idx].alt ? escapeHtml(replaceEntities(unescapeMd(tokens[idx].alt))) : '') + '"';
    var suffix = options.xhtmlOut ? ' /' : '';
    return '<img' + src + alt + title + suffix + ' class="markdown-image">';
};

MarkdownViewer.renderer.rules.heading_open = function (tokens, idx /*, options, env */) {
    return '<h' + tokens[idx].hLevel + ' id=' + tokens[idx + 1].content + ' class="ant-typography">';
    // return '<h' + tokens[idx].hLevel + ' class="ant-typography">';
};
MarkdownViewer.renderer.rules.heading_close = function (tokens, idx /*, options, env */) {
    return '</h' + tokens[idx].hLevel + '>\n';
};

MarkdownViewer.renderer.rules.table_open = function () {
    return '<div class="ant-table ant-table-bordered"><div class="ant-table-container"><table>\n';
}

MarkdownViewer.renderer.rules.table_close = function () {
    return '</table></div></div>\n';
}

MarkdownViewer.renderer.rules.thead_open = function () {
    return '<thead class="ant-table-thead">\n';
}

MarkdownViewer.renderer.rules.tbody_open = function () {
    return '<tbody class="ant-table-tbody">\n';
}

MarkdownViewer.renderer.rules.mark_open = function () {
    return '<span class="ant-typography"><mark>';
};

MarkdownViewer.renderer.rules.mark_close = function () {
    return '</mark></span>';
};

MarkdownViewer.renderer.rules.code = function (tokens, idx /*, options, env */) {
    if (tokens[idx].block) {
        return '<pre><code>' + escapeHtml(tokens[idx].content) + '</code></pre>' + getBreak(tokens, idx);
    }
    return '<span class="ant-typography"><code>' + escapeHtml(tokens[idx].content) + '</code></span>';
};

// コードの変換
MarkdownViewer.use(codeDefaultLang);

// https:// or http:// をaタグに変換
MarkdownViewer.use(linkify);

new Clipboard('.code-clip-board-btn');
export default MarkdownViewer;


// コードの修飾用のヘルパー関数

function codeDefaultLang(md) {
    const rule = md.renderer.rules.fence;
    md.renderer.rules.fence = function (tokens, idx, options, env, instance) {
        if (!tokens[idx].params && md.options.langDefault) {
            tokens[idx].params = md.options.langDefault;
        }
        return rule.call(this, tokens, idx, options, env, instance);
    };
}

function nextToken(tokens, idx) {
    if (++idx >= tokens.length - 2) {
        return idx;
    }
    if ((tokens[idx].type === 'paragraph_open' && tokens[idx].tight) &&
        (tokens[idx + 1].type === 'inline' && tokens[idx + 1].content.length === 0) &&
        (tokens[idx + 2].type === 'paragraph_close' && tokens[idx + 2].tight)) {
        return nextToken(tokens, idx + 2);
    }
    return idx;
}

var getBreak = MarkdownViewer.renderer.rules.getBreak = function getBreak(tokens, idx) {
    idx = nextToken(tokens, idx);
    if (idx < tokens.length && tokens[idx].type === 'list_item_close') {
        return '';
    }
    return '\n';
};