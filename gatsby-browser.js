import wrapWithProvider from "./wrap-with-provider"
import 'highlight.js/styles/tomorrow-night-blue.css'
import 'react-quill/dist/quill.snow.css'
import 'easymde/dist/easymde.min.css'

export const wrapRootElement = wrapWithProvider
const ReactDOM = require('react-dom')

export function replaceHydrateFunction() {
    return (element, container, callback) => {
        ReactDOM.render(element, container, callback)
    }
}