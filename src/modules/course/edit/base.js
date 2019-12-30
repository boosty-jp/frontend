import { getTitleError, getTagsError, getDescriptionError } from 'utils/content-validator';

const SUFFIX = '_COURSE_BASE_EDIT';
const SET_BASE = 'SET_BASE' + SUFFIX;
const CLEAR_BASE = 'CLEAR_BASE' + SUFFIX;
const UPDATE_TITLE = 'UPDATE_TITLE' + SUFFIX;
const UPDATE_IMAGE_URL = 'UPDATE_IMAGE_URL' + SUFFIX;
const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION' + SUFFIX;
const UPDATE_TAGS = 'UPDATE_TAGS' + SUFFIX;
const ADD_TAGS = 'ADD_TAGS' + SUFFIX;

export const setBase = (course) => ({
    type: SET_BASE,
    course: course
})

export const clearBase = () => ({
    type: CLEAR_BASE,
})

export const updateTitle = (title) => ({
    type: UPDATE_TITLE,
    title: title,
    error: getTitleError(title)
})

export const updateImageUrl = (imageUrl) => ({
    type: UPDATE_IMAGE_URL,
    imageUrl: imageUrl
})

export const updateDescription = (description) => ({
    type: UPDATE_DESCRIPTION,
    description: description,
    error: getDescriptionError(description)
})

export const updateTags = (tags) => ({
    type: UPDATE_TAGS,
    tags: tags,
    error: getTagsError(tags)
})

export const addTag = (tag) => ({
    type: ADD_TAGS,
    tag: tag
})

const initialState = {
    id: "",
    title: "",
    description: '',
    imageUrl: '',
    status: "publish",
    tags: [],
    error: {
        title: { status: "", message: "" },
        tags: { status: "", message: "" },
        description: { status: "", message: "" },
    },
}

export default function CourseEditBase(state = initialState, action) {
    switch (action.type) {
        case SET_BASE:
            return {
                ...state,
                id: action.course.id,
                title: action.course.title,
                imageUrl: action.course.imageUrl,
                description: action.course.description,
                status: action.course.status,
                tags: action.course.tags
            };
        case CLEAR_BASE:
            return {
                ...initialState
            };
        case UPDATE_TITLE:
            return {
                ...state,
                title: action.title,
                error: { ...state.error, title: action.error },
            }
        case UPDATE_IMAGE_URL:
            return {
                ...state,
                imageUrl: action.imageUrl,
            }
        case UPDATE_DESCRIPTION:
            return {
                ...state,
                description: action.description,
                error: { ...state.error, description: action.error },
            }
        case UPDATE_TAGS:
            return {
                ...state,
                tags: action.tags,
                error: { ...state.error, tags: action.error },
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