import { coverThemeColors } from 'components/book/edit/cover-generator/color-selector'
const SUFFIX = '_BOOK_GENERATOR';
const UPDATE_TITLE = 'UPDATE_TITLE' + SUFFIX;
const UPDATE_SUB_TITLE = 'UPDATE_SUB_TITLE' + SUFFIX;
const UPDATE_AUTHOR = 'UPDATE_AUTHOR' + SUFFIX;
const UPDATE_TITLE_FONT_SIZE = 'UPDATE_TITLE_FONT_SIZE' + SUFFIX;
const UPDATE_SUB_TITLE_FONT_SIZE = 'UPDATE_SUB_TITLE_FONT_SIZE' + SUFFIX;
const UPDATE_AUTHOR_FONT_SIZE = 'UPDATE_AUTHOR_FONT_SIZE' + SUFFIX;
const UPDATE_COLOR = 'UPDATE_COLOR' + SUFFIX;
const UPDATE_MODE = 'UPDATE_MODE' + SUFFIX;
const UPDATE_TEMPLATE_TYPE = 'UPDATE_TEMPLATE_TYPE' + SUFFIX;
const UPDATE_TEMPLATE_VALUE = 'UPDATE_TEMPLATE_VALUE' + SUFFIX;
const RANDOM_CHANGE_COVER = 'RANDOM_CHANGE_COVER' + SUFFIX;

export const updateTitle = (title) => ({
    type: UPDATE_TITLE,
    title: title,
})

export const updateSubTitle = (subTitle) => ({
    type: UPDATE_SUB_TITLE,
    subTitle: subTitle,
})

export const updateAuthor = (author) => ({
    type: UPDATE_AUTHOR,
    author: author,
})

export const updateTitleFontSize = (titleFontSize) => ({
    type: UPDATE_TITLE_FONT_SIZE,
    titleFontSize: titleFontSize,
})

export const updateSubTitleFontSize = (subTitleFontSize) => ({
    type: UPDATE_SUB_TITLE_FONT_SIZE,
    subTitleFontSize: subTitleFontSize,
})

export const updateAuthorFontSize = (authorFontSize) => ({
    type: UPDATE_AUTHOR_FONT_SIZE,
    authorFontSize: authorFontSize,
})

export const updateTemplateType = (templateType) => ({
    type: UPDATE_TEMPLATE_TYPE,
    templateType: templateType,
})

export const updateTemplateValue = (value) => ({
    type: UPDATE_TEMPLATE_VALUE,
    value: value
})

export const updateColor = (color) => ({
    type: UPDATE_COLOR,
    color: color,
})

export const updateMode = (mode) => ({
    type: UPDATE_MODE,
    mode: mode,
})

export const randomChangeCover = () => ({
    type: RANDOM_CHANGE_COVER,
})

const colors = [
    "#f5222d",
    "#fa541c",
    "#fa8c16",
    "#faad14",
    "#fadb14",
    "#a0d911",
    "#52c41a",
    "#13c2c2",
    "#1890ff",
    "#2f54eb",
    "#722ed1",
    "#eb2f96"
]

const templateTypes = [
    "simple",
    "stripe",
    "curve",
    "pattern",
]

const templateValues = [
    0, 1, 2, 3, 4
]

const initialState = {
    title: "タイトル",
    subTitle: "サブタイトル",
    author: "著者名",
    titleFontSize: 30,
    subTitleFontSize: 16,
    authorFontSize: 14,
    mode: 'normal',
    color: coverThemeColors[0],
    templateType: 'simple',
    templateValue: 0,
}

export default function BookGenerator(state = initialState, action) {
    switch (action.type) {
        case UPDATE_TITLE:
            return {
                ...state,
                title: action.title,
            }
        case UPDATE_SUB_TITLE:
            return {
                ...state,
                subTitle: action.subTitle,
            }
        case UPDATE_AUTHOR:
            return {
                ...state,
                author: action.author,
            }
        case UPDATE_TITLE_FONT_SIZE:
            return {
                ...state,
                titleFontSize: action.titleFontSize,
            }
        case UPDATE_SUB_TITLE_FONT_SIZE:
            return {
                ...state,
                subTitleFontSize: action.subTitleFontSize,
            }
        case UPDATE_AUTHOR_FONT_SIZE:
            return {
                ...state,
                authorFontSize: action.authorFontSize,
            }
        case UPDATE_COLOR:
            return {
                ...state,
                color: action.color,
            }
        case UPDATE_MODE:
            return {
                ...state,
                mode: action.mode,
            }
        case UPDATE_TEMPLATE_TYPE:
            return {
                ...state,
                templateType: action.templateType,
            }
        case UPDATE_TEMPLATE_VALUE:
            return {
                ...state,
                templateValue: action.value,
            }
        case RANDOM_CHANGE_COVER:
            const mode = Math.floor(Math.random() * 2) % 2 === 0 ? 'normal' : 'dark';
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const randomType = templateTypes[Math.floor(Math.random() * templateTypes.length)];
            const randomValue = templateValues[Math.floor(Math.random() * templateValues.length)];
            return {
                ...state,
                mode: mode,
                color: randomColor,
                templateType: randomType,
                templateValue: randomValue
            }
        default:
            return state;
    }
}