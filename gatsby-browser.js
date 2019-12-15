import wrapWithProvider from "./wrap-with-provider"
// import 'highlight.js/styles/tomorrow-night-blue.css'
// import 'highlight.js/styles/github.css';
import 'highlight.js/styles/night-owl.css';
import 'react-quill/dist/quill.snow.css'
import 'easymde/dist/easymde.min.css'
import 'ant-design-pro/dist/ant-design-pro.css';
import 'antd/dist/antd.css';
import 'styles/index.css'

export const wrapRootElement = wrapWithProvider
const ReactDOM = require('react-dom')

export function replaceHydrateFunction() {
    return (element, container, callback) => {
        ReactDOM.render(element, container, callback)
    }
}