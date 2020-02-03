const SUFFIX = '_TEST_ANSWER';
const SET_ANSWER = 'SET_ANSWER' + SUFFIX;
const SET_QUESTIONS = 'SET_QUESTIONS' + SUFFIX;
const CLEAR_ALL = 'CLEAR_ALL' + SUFFIX;
const CLEAR_ANSWER = 'CLEAR_ANSWER' + SUFFIX;
const START = 'START' + SUFFIX;
const ANSWERING = 'ANSWERING' + SUFFIX;
const ANSWER_LIST = 'ANSWER_LIST' + SUFFIX;
const VIEW_ANSWER = 'VIEW_ANSWER' + SUFFIX;
const PREV_QUESTION = 'PREV_QUESTION' + SUFFIX;
const NEXT_QUESTION = 'NEXT_QUESTION' + SUFFIX;
const UPDATE_ANSWER = 'UPDATE_ANSWER' + SUFFIX;

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

export const viewAnswer = (idx) => ({
    type: VIEW_ANSWER,
    idx: idx
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

export const answerList = () => ({
    type: ANSWER_LIST,
})

export const prevQuestion = () => ({
    type: PREV_QUESTION,
})

export const nextQuestion = () => ({
    type: NEXT_QUESTION,
})

export const updateAnswer = (answer) => ({
    type: UPDATE_ANSWER,
    answer: answer,
})

const initialState = {
    mode: 'start',
    currentIdx: 0,
    questions: [],
    answers: [],
}

export default function TestAnswer(state = initialState, action) {
    switch (action.type) {
        case SET_QUESTIONS:
            const answers = action.questions.map(q => { return { questionId: q.id, answer: "", questionType: q.type } });

            return {
                ...state,
                questions: action.questions,
                answers: answers,
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
        case ANSWER_LIST:
            return {
                ...state,
                mode: 'answerList',
            };
        case VIEW_ANSWER:
            return {
                ...state,
                mode: 'answering',
                currentIdx: action.idx
            };
        case PREV_QUESTION:
            const prevIdx = state.currentIdx === 0 ? state.currentIdx : state.currentIdx - 1;
            return {
                ...state,
                currentIdx: prevIdx,
            };
        case NEXT_QUESTION:
            const nextIdx = state.currentIdx === state.questions.length - 1 ? state.currentIdx : state.currentIdx + 1;
            return {
                ...state,
                currentIdx: nextIdx,
            };
        case UPDATE_ANSWER:
            const updatedAnswers = state.answers.concat();
            updatedAnswers[state.currentIdx] = {
                ...updatedAnswers[state.currentIdx],
                answer: action.answer,
            }

            return {
                ...state,
                answers: updatedAnswers,
            };
        default:
            return state;
    }
}