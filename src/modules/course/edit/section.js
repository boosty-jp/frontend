const SUFFIX = '_COURSE_SECTION_EDIT';
const SET_SECTION = 'SET_SECTION' + SUFFIX;
const CLEAR_SECTION = 'CLEAR_SECTION' + SUFFIX;
const UPDATE_TITLE = 'UPDATE_TITLE' + SUFFIX;
const ADD_CONTENT = 'ADD_CONTENT' + SUFFIX;
const UPDATE_CONTENTS = 'UPDATE_CONTENTS' + SUFFIX;
const DELETE_CONTENT = 'DELETE_CONTENT' + SUFFIX;

export const setSection = (title, contents) => ({
    type: SET_SECTION,
    title: title,
    contents: contents,
})

export const updateTitle = (title) => ({
    type: UPDATE_TITLE,
    title: title
})

export const addContent = (content) => ({
    type: ADD_CONTENT,
    content: content,
})

export const updateContents = (contents) => ({
    type: UPDATE_CONTENTS,
    contents: contents
})

export const deleteContent = (id) => ({
    type: DELETE_CONTENT,
    id: id,
})

export const clearSection = () => ({
    type: CLEAR_SECTION,
})

const initialState = {
    title: '',
    contents: []
}

export default function CourseEditSection(state = initialState, action) {
    switch (action.type) {
        case SET_SECTION:
            return {
                ...state,
                title: action.title,
                contents: action.contents,
            };
        case CLEAR_SECTION:
            return {
                ...initialState,
            };
        case UPDATE_TITLE:
            return {
                ...state,
                title: action.title,
            }
        case ADD_CONTENT:
            return {
                ...state,
                contents: [...state.contents, action.content],
            }
        case UPDATE_CONTENTS:
            return {
                ...state,
                contents: action.contents,
            }
        case DELETE_CONTENT:
            const deleteContents = state.contents.concat();
            let idx = -1;
            for (let i = 0; i < deleteContents.length; ++i) {
                if (deleteContents[i].id === action.id) {
                    idx = i;
                }
            }

            if (idx >= 0) {
                deleteContents.splice(idx, 1);
                return {
                    ...state,
                    contents: deleteContents,
                }
            } else {
                return { ...state }
            }
        default:
            return state;
    }
}