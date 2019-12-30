import { getTitleError, getReferenceCourseError, getDescriptionError } from 'utils/content-validator';

const SUFFIX = '_TEST_BASE_EDIT';
const SET_BASE = 'SET_BASE' + SUFFIX;
const CLEAR_BASE = 'CLEAR_BASE' + SUFFIX;
const UPDATE_TITLE = 'UPDATE_TITLE' + SUFFIX;
const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION' + SUFFIX;
const UPDATE_REFERENCE_COURSE = 'UPDATE_REFERENCE_COURSE' + SUFFIX;

export const setBase = (test) => ({
    type: SET_BASE,
    test: test
})

export const clearBase = () => ({
    type: CLEAR_BASE,
})

export const updateTitle = (title) => ({
    type: UPDATE_TITLE,
    title: title,
    error: getTitleError(title)
})

export const updateDescription = (description) => ({
    type: UPDATE_DESCRIPTION,
    description: description,
    error: getDescriptionError(description)
})

export const updatereferenceCourse = (referenceCourse) => ({
    type: UPDATE_REFERENCE_COURSE,
    referenceCourse: referenceCourse,
    error: getReferenceCourseError(referenceCourse)
})

const initialState = {
    id: "",
    title: "",
    description: '',
    referenceCourse: { id: "", name: "", imageUrl: "" },
    status: "publish",
    error: {
        title: { status: "", message: "" },
        description: { status: "", message: "" },
        referenceCourse: { status: "", message: "" },
    },
}

export default function TestEditBase(state = initialState, action) {
    switch (action.type) {
        case SET_BASE:
            return {
                ...state,
                id: action.test.id,
                title: action.test.title,
                description: action.test.description,
                referenceCourse: action.test.referenceCourse,
                status: action.test.status,
                tags: action.test.tags
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
        case UPDATE_DESCRIPTION:
            return {
                ...state,
                description: action.description,
                error: { ...state.error, description: action.error },
            }
        case UPDATE_REFERENCE_COURSE:
            return {
                ...state,
                referenceCourse: action.referenceCourse,
                error: { ...state.error, referenceCourse: action.error },
            }
        default:
            return state;
    }
}