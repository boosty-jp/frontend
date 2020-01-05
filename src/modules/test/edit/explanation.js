import { getExplanationTextError, getReferenceError } from 'utils/content-validator'
const SUFFIX = '_TEST_EXPLANATION_EDIT';
const SET_EXPLANATION = 'SET_EXPLANATION' + SUFFIX;
const CLEAR_EXPLANATION = 'CLEAR_EXPLANATION' + SUFFIX;
const ADD_REFERENCE = 'ADD_REFERENCE' + SUFFIX;
const UPDATE_REFERENCES = 'UPDATE_REFERENCES' + SUFFIX;
const REMOVE_REFERENCE = 'REMOVE_REFERENCE' + SUFFIX;
const UPDATE_TEXT = 'UPDATE_TEXT' + SUFFIX;

export const setExplanation = (explanation) => ({
    type: SET_EXPLANATION,
    explanation: explanation,
})

export const clearExplanation = () => ({
    type: CLEAR_EXPLANATION,
})

export const updateReferences = (references) => ({
    type: UPDATE_REFERENCES,
    references: references,
})

export const addReference = (block) => ({
    type: ADD_REFERENCE,
    block: block,
})

export const removeReference = (id) => ({
    type: REMOVE_REFERENCE,
    id: id,
})

export const updateText = (text, textCount, blockCount, blocks) => ({
    type: UPDATE_TEXT,
    text: text,
    textCount: textCount,
    blockCount: blockCount,
    blocks: blocks,
    error: getExplanationTextError(blockCount, textCount),
})

const initialState = {
    references: [],
    explanationBlocks: [],
    explanationText: '',
    explanationTextCount: 0,
    explanationBlockCount: 0,
    error: {
        references: { status: "", message: "" },
        explanation: { status: "", message: "" },
    },
}

export default function TestEditExplanation(state = initialState, action) {
    switch (action.type) {
        case SET_EXPLANATION:
            return {
                ...state,
                references: action.explanation.references,
            };
        case CLEAR_EXPLANATION:
            return {
                ...initialState
            };
        case ADD_REFERENCE:
            var addedBlocks = state.references.concat();
            addedBlocks.push(action.block);
            const referenceError = getReferenceError(addedBlocks);

            return {
                ...state,
                references: addedBlocks,
                error: { ...state.error, references: referenceError }
            };
        case UPDATE_REFERENCES:
            return {
                ...state,
                references: action.references,
            };
        case REMOVE_REFERENCE:
            const ids = state.references.map(a => { return a.id });
            const deletedReferenceBlocks = state.references.concat();
            const idx = ids.indexOf(action.id);
            deletedReferenceBlocks.splice(idx, 1);

            return {
                ...state,
                references: deletedReferenceBlocks,
            };
        case UPDATE_TEXT:
            return {
                ...state,
                text: action.text,
                blocks: action.blocks,
                textCount: action.textCount,
                blockCount: action.blockCount,
                error: { ...state.error, explanation: action.error }
            }
        default:
            return state;
    }
}