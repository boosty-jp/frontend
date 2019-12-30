const SUFFIX = '_TEST_QUESTIONS_EDIT';
const SET_QUESTIONS = 'SET_QUESTIONS' + SUFFIX;
const CLEAR_QUESTIONS = 'CLEAR_QUESTIONS' + SUFFIX;

export const setQuestions = (questions) => ({
    type: SET_QUESTIONS,
    questions: questions
})

export const clearQuestions = () => ({
    type: CLEAR_QUESTIONS,
})

const initialState = {
    questions: [],
    error: {
        title: { status: "", message: "" },
        description: { status: "", message: "" },
        referenceCourse: { status: "", message: "" },
    },
}

export default function TestEditQuestions(state = initialState, action) {
    switch (action.type) {
        case SET_QUESTIONS:
            return {
                ...state,
                questions: action.questions,
            };
        case CLEAR_QUESTIONS:
            return {
                ...initialState
            };
        default:
            return state;
    }
}