import wrapWithProvider from "./wrap-with-provider"
import 'react-quill/dist/quill.snow.css'
import 'easymde/dist/easymde.min.css'
import 'antd/dist/antd.css';
import 'highlight.js/styles/tomorrow-night-blue.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import 'instantsearch.css/themes/reset.css';
import 'tocbot/dist/tocbot.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import '@fortawesome/fontawesome-free/css/regular.min.css';
import 'styles/index.css'

export const wrapRootElement = wrapWithProvider;
const ReactDOM = require('react-dom')

export function replaceHydrateFunction() {
    return (element, container, callback) => {
        ReactDOM.render(element, container, callback)
    }
}