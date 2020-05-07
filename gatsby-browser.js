import wrapWithProvider from "./wrap-with-provider"
// import 'highlight.js/styles/tomorrow-night-blue.css'
// import 'highlight.js/styles/github.css';
import 'react-quill/dist/quill.snow.css'
import 'easymde/dist/easymde.min.css'
import 'antd/dist/antd.css';
import 'styles/index.css'
import 'highlight.js/styles/tomorrow-night-blue.css';
import 'ant-design-pro/dist/ant-design-pro.css';
// import 'instantsearch.css/themes/algolia.css';
import 'instantsearch.css/themes/reset.css';
import 'tocbot/dist/tocbot.css';

export const wrapRootElement = wrapWithProvider
const ReactDOM = require('react-dom')

export function replaceHydrateFunction() {
    return (element, container, callback) => {
        ReactDOM.render(element, container, callback)
    }
}