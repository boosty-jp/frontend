import { getTitleError, getAnswerTypeError, getQuestionError } from "utils/content-validator";

const SUFFIX = '_TEST_QUESTION_EDIT';
const SET_QUESTION = 'SET_QUESTION' + SUFFIX;
const CLEAR_QUESTION = 'CLEAR_QUESTION' + SUFFIX;
const UPDATE_TITLE = 'UPDATE_TITLE' + SUFFIX;
const UPDATE_TYPE = 'UPDATE_TYPE' + SUFFIX;
const UPDATE_QUESTION = 'UPDATE_QUESTION' + SUFFIX;
const ADD_EXPLANATION = 'ADD_EXPLANATION' + SUFFIX;
const UPDATE_EXPLANATIONS = 'UPDATE_EXPLANATIONS' + SUFFIX;
const REMOVE_EXPLANATION = 'REMOVE_EXPLANATION' + SUFFIX;

export const setQuestion = (questions) => ({
    type: SET_QUESTION,
    questions: questions
})

export const clearQuestion = () => ({
    type: CLEAR_QUESTION,
})

export const updateTitle = (title) => ({
    type: UPDATE_TITLE,
    title: title,
    error: getTitleError(title),
})

export const updateType = (type) => ({
    type: UPDATE_TYPE,
    answerType: type,
    error: getAnswerTypeError(type),
})

export const addExplanation = (references, blocks) => ({
    type: ADD_EXPLANATION,
    blocks: blocks,
    references: references,
})

export const updateExplanations = (explanations) => ({
    type: UPDATE_EXPLANATIONS,
    explanations: explanations
})

export const removeExplanation = (idx) => ({
    type: REMOVE_EXPLANATION,
    idx: idx
})

export const updateQuestion = (text, textCount, blockCount, blocks) => ({
    type: UPDATE_QUESTION,
    text: text,
    blocks: blocks,
    textCount: textCount,
    blockCount: blockCount,
    error: getQuestionError(blockCount, textCount)
})

const initialState = {
    title: '',
    questionBlocks: [],
    questionText: '',
    questionTextCount: 0,
    questionBlockCount: 0,
    type: 'select',
    answers: [],
    explanations: [],
    error: {
        title: { status: "", message: "" },
        question: { status: "", message: "" },
        type: { status: "", message: "" },
        answers: { status: "", message: "" },
        explanations: { status: "", message: "" },
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
        case UPDATE_TITLE:
            return {
                ...state,
                title: action.title,
                error: { ...state.error, title: action.error }
            };
        case UPDATE_TYPE:
            return {
                ...state,
                type: action.answerType,
                answers: [],
                error: { ...state.error, type: action.error }
            };
        case UPDATE_QUESTION:
            return {
                ...state,
                text: action.text,
                blocks: action.blocks,
                textCount: action.textCount,
                blockCount: action.blockCount,
                error: { ...state.error, question: action.error }
            }
        case ADD_EXPLANATION:
            const addedExplanations = state.explanations.concat();
            addedExplanations.push({ references: action.references, blocks: action.blocks })
            return {
                ...state,
                explanations: addedExplanations
            }
        case UPDATE_EXPLANATIONS:
            return {
                ...state,
                explanations: action.explanations,
            }
        case REMOVE_EXPLANATION:
            const removedExplanations = state.explanations.concat();
            removedExplanations.splice(action.idx, 1);

            return {
                ...state,
                explanations: removedExplanations,
            }
        default:
            return state;
    }
}