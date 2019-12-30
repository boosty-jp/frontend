const SUFFIX = '_TEST_QUESTION_EDIT';
const SET_QUESTION = 'SET_QUESTION' + SUFFIX;
const CLEAR_QUESTION = 'CLEAR_QUESTION' + SUFFIX;
const UPDATE_TITLE = 'UPDATE_TITLE' + SUFFIX;
const UPDATE_TYPE = 'UPDATE_TYPE' + SUFFIX;
const ADD_REFERENCE_BLOCKS = 'ADD_REFERENCE_BLOCKS' + SUFFIX;
const DELETE_REFERENCE_BLOCKS = 'DELETE_REFERENCE_BLOCKS' + SUFFIX;
const UPDATE_QUESTION = 'UPDATE_QUESTION' + SUFFIX;

export const setQuestion = (questions) => ({
    type: SET_QUESTION,
    questions: questions
})

export const clearQuestion = () => ({
    type: CLEAR_QUESTION,
})

export const updateTitle = (title) => ({
    type: UPDATE_TITLE,
    title: title
})

export const updateType = (type) => ({
    type: UPDATE_TYPE,
    type: type
})

export const addBlocks = (blocks) => ({
    type: ADD_REFERENCE_BLOCKS,
    blocks: blocks
})

export const deleteBlock = (block) => ({
    type: DELETE_REFERENCE_BLOCKS,
    block: block,
})

export const updateQuestion = (question) => ({
    type: UPDATE_QUESTION,
    question: question
})

const initialState = {
    title: '',
    type: '',
    referenceBlocks: [],
    question: [],
    answer: [],
    error: {
        title: { status: "", message: "" },
        description: { status: "", message: "" },
        referenceCourse: { status: "", message: "" },
    },
}

export default function TestEditQuestion(state = initialState, action) {
    switch (action.type) {
        case SET_QUESTION:
            return {
                ...state,
                questions: action.question,
            };
        case CLEAR_QUESTION:
            return {
                ...initialState
            };
        default:
            return state;
    }
}