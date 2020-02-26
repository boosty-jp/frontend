import { getTitleError } from 'utils/content-validator';
import { convertToJSX } from 'utils/html-converter';

const SUFFIX = '_PAGE_EDIT';
const SET_PAGE = 'SET_PAGE' + SUFFIX;
const CLEAR_PAGE = 'CLEAR_PAGE' + SUFFIX;
const UPDATE_TITLE = 'UPDATE_TITLE' + SUFFIX;
const UPDATE_TEXT = 'UPDATE_TEXT' + SUFFIX;
const TOGGLE_PREVIEW = 'TOGGLE_PREVIEW' + SUFFIX;

export const setPage = (page) => ({
    type: SET_PAGE,
    page: page
})

export const clearPage = () => ({
    type: CLEAR_PAGE,
})

export const updateTitle = (title) => ({
    type: UPDATE_TITLE,
    title: title,
    error: getTitleError(title)
})

export const updateText = (text, rawTexts, anchors, textCount, blockCount, blocks) => ({
    type: UPDATE_TEXT,
    text: text,
    rawTexts: rawTexts,
    anchors: anchors,
    textCount: textCount,
    blockCount: blockCount,
    blocks: blocks,
})

export const togglePreview = () => ({
    type: TOGGLE_PREVIEW,
})

const initialState = {
    id: "",
    title: "",
    canPreview: false,
    blocks: [],
    text: '',
    rawTexts: '',
    textCount: 0,
    blockCount: 0,
    previewMode: false,
    loading: true, //EditorJSのリロード用につかう
    error: {
        title: { status: "", message: "" },
        blocks: { status: "", message: "" },
    },
}

export default function PageEdit(state = initialState, action) {
    switch (action.type) {
        case SET_PAGE:
            const setBlocks = action.page.blocks.map(b => { return { ...b, data: JSON.parse(b.data) } });
            const { textCount, blockCount, rawTexts, text, anchors } = convertToJSX(setBlocks);
            return {
                ...state,
                id: action.page.base.id,
                title: action.page.base.title,
                canPreview: action.page.base.canPreview,
                blocks: setBlocks,
                text: text,
                rawTexts: rawTexts,
                textCount: textCount,
                blockCount: blockCount,
                anchors: anchors,
                previewMode: false,
                loading: false
            };
        case CLEAR_PAGE:
            return { ...initialState }
        case UPDATE_TITLE:
            return {
                ...state,
                title: action.title,
                error: { ...state.error, title: action.error }
            }
        case UPDATE_TEXT:
            return {
                ...state,
                text: action.text,
                rawTexts: action.rawTexts,
                blocks: action.blocks,
                anchors: action.anchors,
                textCount: action.textCount,
                blockCount: action.blockCount,
            }
        case TOGGLE_PREVIEW:
            return {
                ...state,
                previewMode: !state.previewMode
            }
        default:
            return state;
    }
}