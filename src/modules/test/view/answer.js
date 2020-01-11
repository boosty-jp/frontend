const SUFFIX = '_TEST_ANSWER';
const SET_ANSWER = 'SET_ANSWER' + SUFFIX;
const SET_QUESTIONS = 'SET_QUESTIONS' + SUFFIX;
const CLEAR_ALL = 'CLEAR_ALL' + SUFFIX;
const CLEAR_ANSWER = 'CLEAR_ANSWER' + SUFFIX;
const START = 'START' + SUFFIX;
const ANSWERING = 'ANSWERING' + SUFFIX;
const COMPLETE = 'COMPLETE' + SUFFIX;
const PREV_QUESTION = 'PREV_QUESTION' + SUFFIX;
const NEXT_QUESTION = 'NEXT_QUESTION' + SUFFIX;

export const setQuestions = (questions) => ({
    type: SET_QUESTIONS,
    questions: questions,
})

export const setAnswer = (answer) => ({
    type: SET_ANSWER,
    answer: answer
})

export const clearAnswer = () => ({
    type: CLEAR_ANSWER,
})

export const clearAll = () => ({
    type: CLEAR_ALL,
})

export const start = () => ({
    type: START,
})

export const answering = () => ({
    type: ANSWERING,
})

export const complete = () => ({
    type: COMPLETE,
})

export const prevQuestion = () => ({
    type: PREV_QUESTION,
})

export const nextQuestion = () => ({
    type: NEXT_QUESTION,
})

const initialState = {
    mode: 'start',
    currentIdx: 0,
    questions: [],
    answers: [],
    ownAnswsers: [],
}

export default function TestEditBase(state = initialState, action) {
    switch (action.type) {
        case SET_QUESTIONS:
            return {
                ...state,
                questions: action.questions,
            };
        case SET_ANSWER:
            return {
                ...state,
                id: action.test.id,
                title: action.test.title,
                description: action.test.description,
                referenceCourse: action.test.referenceCourse,
                createDate: action.test.createDate,
                updateDate: action.test.updateDate,
                status: action.test.status,
                questions: action.test.questions,
                author: action.test.author,
            };
        case CLEAR_ANSWER:
            return {
                ...initialState, answers: state.answers, currentIdx: state.currentIdx
            };
        case CLEAR_ALL:
            return {
                ...initialState
            };
        case START:
            return {
                ...state,
                mode: 'start',
            };
        case ANSWERING:
            return {
                ...state,
                mode: 'answering',
            };
        case COMPLETE:
            return {
                ...state,
                mode: 'complete',
            };
        case PREV_QUESTION:
            const prevIdx = state.currentIdx === 0 ? state.currentIdx : state.currentIdx - 1;
            return {
                ...state,
                currentIdx: prevIdx,
            };
        case NEXT_QUESTION:
            const nextIdx = state.currentIdx === state.questions.length ? state.currentIdx : state.currentIdx + 1;
            return {
                ...state,
                currentIdx: nextIdx,
            };
        default:
            return state;
    }
}