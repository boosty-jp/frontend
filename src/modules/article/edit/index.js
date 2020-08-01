import { getTitleError } from 'utils/content-validator';

const SUFFIX = '_ARTICLE_EDIT';
const SET_ARTICLE = 'SET_ARTICLE' + SUFFIX;
const CLEAR_ARTICLE = 'CLEAR_ARTICLE' + SUFFIX;
const UPDATE_TITLE = 'UPDATE_TITLE' + SUFFIX;
const UPDATE_FREE_TEXT = 'UPDATE_FREE_TEXT' + SUFFIX;
const UPDATE_TEXT = 'UPDATE_TEXT' + SUFFIX;
const UPDATE_PRICE = 'UPDATE_PRICE' + SUFFIX;
const TOGGLE_PREVIEW = 'TOGGLE_PREVIEW' + SUFFIX;
const PREVIEW_ARTICLE = 'PREVIEW_ARTICLE' + SUFFIX;
const EDIT_ARTICLE = 'EDIT_ARTICLE' + SUFFIX;
const SAVE_ARTICLE = 'SAVE_ARTICLE' + SUFFIX;

export const setArticle = (article) => ({
    type: SET_ARTICLE,
    article: article
})

export const clearArticle = () => ({
    type: CLEAR_ARTICLE,
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

export const editArticle = () => ({
    type: EDIT_ARTICLE,
})

export const previewArticle = () => ({
    type: PREVIEW_ARTICLE,
})

export const saveArticle = () => ({
    type: SAVE_ARTICLE,
})

const initialState = {
    id: "",
    title: "",
    freeText: '',
    text: '',
    price: 0,
    canPreview: false,
    saved: true,
    previewMode: true,
    error: {
        title: { status: "", message: "" },
        text: { status: "", message: "" },
    },
}

export default function ArticleEdit(state = initialState, action) {
    switch (action.type) {
        case SET_ARTICLE:
            return {
                ...state,
                id: action.article.id,
                title: action.article.title,
                text: action.article.text,
                canPreview: action.article.canPreview,
                previewMode: true,
                loading: false
            };
        case CLEAR_ARTICLE:
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
        case EDIT_ARTICLE:
            return {
                ...state,
                previewMode: false
            }
        case PREVIEW_ARTICLE:
            return {
                ...state,
                previewMode: true
            }
        case SAVE_ARTICLE:
            return {
                ...state,
                saved: true
            }
        default:
            return state;
    }
}