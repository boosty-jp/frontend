import { getTitleError } from 'utils/content-validator';

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

export const updateText = (text) => ({
    type: UPDATE_TEXT,
    text: text,
})

export const togglePreview = () => ({
    type: TOGGLE_PREVIEW,
})

const initialState = {
    id: "",
    title: "",
    text: '',
    canPreview: false,
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