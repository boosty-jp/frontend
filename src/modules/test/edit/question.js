import { getExplanationsError, getAnswerTextError, getAnswerTypeError, getQuestionError } from "utils/content-validator";

const SUFFIX = '_TEST_QUESTION_EDIT';
const SET_QUESTION = 'SET_QUESTION' + SUFFIX;
const CLEAR_QUESTION = 'CLEAR_QUESTION' + SUFFIX;
const UPDATE_TYPE = 'UPDATE_TYPE' + SUFFIX;
const UPDATE_QUESTION = 'UPDATE_QUESTION' + SUFFIX;
const ADD_EXPLANATION = 'ADD_EXPLANATION' + SUFFIX;
const UPDATE_EXPLANATIONS = 'UPDATE_EXPLANATIONS' + SUFFIX;
const REMOVE_EXPLANATION = 'REMOVE_EXPLANATION' + SUFFIX;
const ADD_SELECT_ANSWER_CANDIDATE = 'ADD_SELECT_ANSWER_CANDIDATE' + SUFFIX;
const UPDATE_SELECT_ANSWER_CANDIDATE = 'UPDATE_SELECT_ANSWER_CANDIDATE' + SUFFIX;
const DELETE_SELECT_ANSWER_CANDIDATE = 'DELETE_SELECT_ANSWER_CANDIDATE' + SUFFIX;
const CHANGE_SELECT_ANSWER = 'CHANGE_SELECT_ANSWER' + SUFFIX;
const UPDATE_TEXT_ANSWER = 'UPDATE_TEXT_ANSWER' + SUFFIX;
const UPDATE_TEXT_ANSWER_SHOW_COUNT = 'UPDATE_TEXT_ANSWER_SHOW_COUNT' + SUFFIX;
const UPDATE_QUESTION_ERROR = 'UPDATE_QUESTION_ERROR' + SUFFIX;
const UPDATE_EXPLANATION_ERROR = 'UPDATE_EXPLANATION_ERROR' + SUFFIX;

export const setQuestion = (question, idx) => ({
    type: SET_QUESTION,
    question: question,
    idx: idx,
})

export const clearQuestion = () => ({
    type: CLEAR_QUESTION,
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

export const addSelectAnswerCandiadte = () => ({
    type: ADD_SELECT_ANSWER_CANDIDATE,
})

export const updateSelectAnswerCandiadte = (idx, text) => ({
    type: UPDATE_SELECT_ANSWER_CANDIDATE,
    idx: idx,
    text: text,
})

export const deleteSelectAnswerCandiadte = (idx) => ({
    type: DELETE_SELECT_ANSWER_CANDIDATE,
    idx: idx,
})

export const changeSelectAnswer = (idx) => ({
    type: CHANGE_SELECT_ANSWER,
    idx: idx,
})

export const updateTextAnswer = (text) => ({
    type: UPDATE_TEXT_ANSWER,
    text: text,
})

export const updateTextAnswerShowCount = (showCount) => ({
    type: UPDATE_TEXT_ANSWER_SHOW_COUNT,
    showCount: showCount,
})

export const updateQuestion = (text, textCount, blockCount, blocks) => ({
    type: UPDATE_QUESTION,
    text: text,
    blocks: blocks,
    textCount: textCount,
    blockCount: blockCount,
    error: getQuestionError(blockCount, textCount)
})

export const updateQuestionError = (questionError, typeError, errorMappedAnswer) => ({
    type: UPDATE_QUESTION_ERROR,
    questionError: questionError,
    typeError: typeError,
    errorMappedAnswer: errorMappedAnswer,
})

export const updateExplanationError = (explanationError) => ({
    type: UPDATE_EXPLANATION_ERROR,
    explanationError: explanationError,
})

const initialState = {
    questionBlocks: [],
    questionText: '',
    questionTextCount: 0,
    questionBlockCount: 0,
    type: 'select',
    answer: {
        select: [
            { text: '', answer: true, error: { status: '', message: '' } },
            { text: '', answer: false, error: { status: '', message: '' } },
            { text: '', answer: false, error: { status: '', message: '' } },
            { text: '', answer: false, error: { status: '', message: '' } },
        ],
        text: { text: '', showCount: false, error: { status: '', message: '' } },
    },
    explanations: [],
    isEditMode: false,
    updateTargetIdx: 0,
    error: {
        question: { status: "", message: "" },
        type: { status: "", message: "" },
        answer: { status: "", message: "" },
        explanations: { status: "", message: "" },
    },
}

export default function TestEditQuestion(state = initialState, action) {
    switch (action.type) {
        case SET_QUESTION:
            if (action.question.type === 'select') {
                return {
                    ...state,
                    questionBlocks: action.question.questionBlocks,
                    questionTextCount: 100, //TODO: 仮でいれているので、あとで直す
                    questionBlockCount: action.question.questionBlocks.length,
                    type: action.question.type,
                    explanations: action.question.explanations,
                    answer: { ...state.answer, select: action.question.answer },
                    isEditMode: true,
                    updateTargetIdx: action.idx,
                };
            } else if (action.question.type === 'text') {
                return {
                    ...state,
                    questionTextCount: 100, //TODO: 仮でいれているので、あとで直す
                    questionBlockCount: action.question.questionBlocks.length,
                    questionBlocks: action.question.questionBlocks,
                    type: action.question.type,
                    explanations: action.question.explanations,
                    answer: { ...state.answer, text: action.question.answer },
                    isEditMode: true,
                    updateTargetIdx: action.idx,
                };
            }
            return {
                ...initialState
            };
        case CLEAR_QUESTION:
            return {
                ...initialState
            };
        case UPDATE_TYPE:
            return {
                ...state,
                type: action.answerType,
                error: { ...state.error, type: action.error }
            };
        case UPDATE_QUESTION:
            return {
                ...state,
                questionText: action.text,
                questionBlocks: action.blocks,
                questionTextCount: action.textCount,
                questionBlockCount: action.blockCount,
                error: { ...state.error, question: action.error }
            }
        case ADD_EXPLANATION:
            const addedExplanations = state.explanations.concat();
            addedExplanations.push({ references: action.references, blocks: action.blocks })

            const addedExplanationError = getExplanationsError(addedExplanations);
            return {
                ...state,
                explanations: addedExplanations,
                error: { ...state.error, explanations: addedExplanationError }
            }
        case UPDATE_EXPLANATIONS:
            return {
                ...state,
                explanations: action.explanations,
            }
        case REMOVE_EXPLANATION:
            const removedExplanations = state.explanations.concat();
            removedExplanations.splice(action.idx, 1);

            const removeExplanationError = getExplanationsError(removedExplanations);

            return {
                ...state,
                explanations: removedExplanations,
                error: { ...state.error, explanations: removeExplanationError }
            }
        case ADD_SELECT_ANSWER_CANDIDATE:
            if (state.answer.select.length >= 5) {
                return { ...state };
            }
            const addedCandidates = state.answer.select.concat();
            addedCandidates.push({ text: '', answer: false, error: { status: 'error', message: '入力してください' } });

            return {
                ...state,
                answer: { ...state.answer, select: addedCandidates },
            }
        case UPDATE_SELECT_ANSWER_CANDIDATE:
            const updatedCandidates = state.answer.select.concat();
            updatedCandidates[action.idx].text = action.text;
            updatedCandidates[action.idx].error = getAnswerTextError(action.text);

            return {
                ...state,
                answer: { ...state.answer, select: updatedCandidates },
            }
        case DELETE_SELECT_ANSWER_CANDIDATE:
            const deletedCandidates = state.answer.select.concat();
            const targetIsAnswer = deletedCandidates[action.idx].answer;
            deletedCandidates.splice(action.idx, 1);
            //削除する選択肢が答えだった場合、先頭の選択肢を答えにする
            if (targetIsAnswer) deletedCandidates[0].answer = true;

            return {
                ...state,
                answer: { ...state.answer, select: deletedCandidates },
            }
        case CHANGE_SELECT_ANSWER:
            const changedCandidates = state.answer.select.map(c => { return { ...c, answer: false } });
            changedCandidates[action.idx - 1].answer = true;

            return {
                ...state,
                answer: { ...state.answer, select: changedCandidates },
            }
        case UPDATE_TEXT_ANSWER:
            return {
                ...state,
                answer: {
                    ...state.answer,
                    text: {
                        ...state.answer.text,
                        text: action.text,
                        error: getAnswerTextError(action.text)
                    }
                },
            }
        case UPDATE_TEXT_ANSWER_SHOW_COUNT:
            return {
                ...state,
                answer: {
                    ...state.answer,
                    text: {
                        ...state.answer.text,
                        showCount: action.showCount,
                    }
                },
            }
        case UPDATE_QUESTION_ERROR:
            if (state.type === 'select') {
                return {
                    ...state,
                    answer: { ...state.answer, select: action.errorMappedAnswer },
                    error: {
                        ...state.error,
                        question: action.questionError,
                        type: action.typeError,
                    }
                }
            } else if (state.type === 'text') {
                return {
                    ...state,
                    answer: { ...state.answer, text: action.errorMappedAnswer },
                    error: {
                        ...state.error,
                        question: action.questionError,
                        type: action.typeError,
                    }
                }
            } else {
                return {
                    ...state,
                    error: {
                        ...state.error,
                        question: action.questionError,
                        type: action.typeError,
                    }
                }
            }
        case UPDATE_EXPLANATION_ERROR:
            return {
                ...state,
                error: {
                    ...state.error,
                    explanations: action.explanationError,
                }
            }
        default:
            return state;
    }
}