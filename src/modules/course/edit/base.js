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
    imageUrl: 'https://assets.st-note.com/production/uploads/images/16134453/rectangle_large_type_2_02b461d00e4d3c026d7706c5c3144351.png?fit=bounds&format=jpeg&quality=45&width=960',
    status: "publish",
    tags: [],
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
                tags: action.tags.concat(),
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