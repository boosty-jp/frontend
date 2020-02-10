import { getTitleError } from 'utils/content-validator';

const SUFFIX = '_PAGE_EDIT';
const SET_PAGE = 'SET_PAGE' + SUFFIX;
const UPDATE_TITLE = 'UPDATE_TITLE' + SUFFIX;
const UPDATE_TEXT = 'UPDATE_TEXT' + SUFFIX;

export const setPage = (page) => ({
    type: SET_PAGE,
    page: page
})

export const updateTitle = (title) => ({
    type: UPDATE_TITLE,
    title: title,
    error: getTitleError(title)
})

export const updateText = (text, textCount, blockCount, blocks) => ({
    type: UPDATE_TEXT,
    text: text,
    textCount: textCount,
    blockCount: blockCount,
    blocks: blocks,
})

const initialState = {
    id: "",
    title: "",
    canPreview: false,
    blocks: [],
    text: '',
    textCount: 0,
    blockCount: 0,
    error: {
        title: { status: "", message: "" },
        blocks: { status: "", message: "" },
    },
}

export default function PageEdit(state = initialState, action) {
    switch (action.type) {
        case SET_PAGE:
            return {
                ...state,
                id: action.page.base.id,
                title: action.page.base.title,
                canPreview: action.page.base.canPreview,
                blocks: action.page.blocks.map(b => { return { ...b, data: JSON.parse(b.data) } }),
            };
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
                blocks: action.blocks,
                textCount: action.textCount,
                blockCount: action.blockCount,
            }
        default:
            return state;
    }
}