import { getTitleError } from 'utils/content-validator';

const SUFFIX = '_PAGE_EDIT';
const SET_PAGE = 'SET_PAGE' + SUFFIX;
const CLEAR_PAGE = 'CLEAR_PAGE' + SUFFIX;
const UPDATE_TITLE = 'UPDATE_TITLE' + SUFFIX;
const UPDATE_TEXT = 'UPDATE_TEXT' + SUFFIX;
const TOGGLE_PREVIEW = 'TOGGLE_PREVIEW' + SUFFIX;
const PREVIEW_PAGE = 'PREVIEW_PAGE' + SUFFIX;
const EDIT_PAGE = 'EDIT_PAGE' + SUFFIX;
const SAVE_PAGE = 'SAVE_PAGE' + SUFFIX;

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

export const updateText = (text) => ({
    type: UPDATE_TEXT,
    text: text,
})

export const togglePreview = () => ({
    type: TOGGLE_PREVIEW,
})

export const editPage = () => ({
    type: EDIT_PAGE,
})

export const previewPage = () => ({
    type: PREVIEW_PAGE,
})

export const savePage = () => ({
    type: SAVE_PAGE,
})

const initialState = {
    id: "",
    title: "",
    text: '',
    canPreview: false,
    saved: true,
    previewMode: true,
    loading: true, //EditorJSのリロード用につかう
    error: {
        title: { status: "", message: "" },
        text: { status: "", message: "" },
    },
}

export default function PageEdit(state = initialState, action) {
    switch (action.type) {
        case SET_PAGE:
            return {
                ...state,
                id: action.page.id,
                title: action.page.title,
                text: action.page.text,
                canPreview: action.page.canPreview,
                previewMode: true,
                loading: false
            };
        case CLEAR_PAGE:
            return { ...initialState }
        case UPDATE_TITLE:
            return {
                ...state,
                title: action.title,
                error: { ...state.error, title: action.error },
                saved: false,
            }
        case UPDATE_TEXT:
            return {
                ...state,
                text: action.text,
                saved: false,
            }
        case TOGGLE_PREVIEW:
            return {
                ...state,
                previewMode: !state.previewMode
            }
        case EDIT_PAGE:
            return {
                ...state,
                previewMode: false
            }
        case PREVIEW_PAGE:
            return {
                ...state,
                previewMode: true
            }
        case SAVE_PAGE:
            return {
                ...state,
                saved: true
            }
        default:
            return state;
    }
}