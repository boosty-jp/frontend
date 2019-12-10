import { Remarkable } from 'remarkable';
import { linkify } from 'remarkable/linkify';
import hljs from 'highlight.js';

var MarkdownRenderer = new Remarkable('full', {
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
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) { }
        }

        try {
            return hljs.highlightAuto(str).value;
        } catch (__) { }

        return ''; // use external default escaping
    }
});

function codeDefaultLang(md) {
    const rule = md.renderer.rules.fence;
    md.renderer.rules.fence = function (tokens, idx, options, env, instance) {
        if (!tokens[idx].params && md.options.langDefault) {
            tokens[idx].params = md.options.langDefault;
        }
        return rule.call(this, tokens, idx, options, env, instance);
    };
}

// テーブルをSemantic UIのコンポーネントに変換
MarkdownRenderer.renderer.rules.table_open = function () {
    return '<table class="ui celled table">\n';
}

// コードの変換
MarkdownRenderer.use(codeDefaultLang);

// https:// or http:// をaタグに変換
MarkdownRenderer.use(linkify);

export default MarkdownRenderer;