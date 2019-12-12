const SUFFIX = '_COURSE_BASE_EDIT';
const SET_BASE = 'SET_BASE' + SUFFIX;
const UPDATE_TITLE = 'UPDATE_TITLE' + SUFFIX;
const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION' + SUFFIX;
const UPDATE_TAGS = 'UPDATE_TAGS' + SUFFIX;
const ADD_TAGS = 'ADD_TAGS' + SUFFIX;

export const setBase = (base) => ({
    type: SET_BASE,
    base: base
})

export const updateTitle = (title) => ({
    type: UPDATE_TITLE,
    title: title
})

export const updateDescription = (description) => ({
    type: UPDATE_DESCRIPTION,
    description: description
})

export const updateTags = (tags) => ({
    type: UPDATE_TAGS,
    tags: tags
})

export const addTag = (tag) => ({
    type: ADD_TAGS,
    tag: tag
})

const initialState = {
    id: "",
    title: "",
    description: '',
    imageUrl: "",
    status: "publish",
    tags: [],
    skills: [],
    base: {},
    statistics: {},
    author: {},
    action: {},
}

export default function CourseEditBase(state = initialState, action) {
    switch (action.type) {
        case SET_BASE:
            return {
                ...state,
                id: action.base.id,
                title: action.base.title,
                imageUrl: action.base.imageUrl,
                description: action.base.description,
                status: action.base.status,
                elements: action.elements.concat(),
                tags: action.tags.concat(),
                base: action.base,
                statistics: action.statistics,
                author: action.author,
                statisticsLoaded: false,
                action: action.action
            };

        case UPDATE_TITLE:
            return {
                ...state,
                title: action.title,
            }
        case UPDATE_DESCRIPTION:
            return {
                ...state,
                description: action.description,
            }
        case UPDATE_TAGS:
            return {
                ...state,
                tags: action.tags,
            }
        case ADD_TAGS:
            return {
                ...state,
                tags: [...state.tags, action.tag],
            }
        default:
            return state;
    }
}