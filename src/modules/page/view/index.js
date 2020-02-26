import { convertToJSX } from 'utils/html-converter';

const SUFFIX = '_PAGE_VIEW';
const SET_PAGE = 'SET_PAGE' + SUFFIX;
const CLEAR_PAGE = 'CLEAR_PAGE' + SUFFIX;

export const setPage = (page) => ({
    type: SET_PAGE,
    page: page
})

export const clearPage = () => ({
    type: CLEAR_PAGE,
})

const initialState = {
    id: "",
    title: "",
    canPreview: false,
    blocks: [],
    text: '',
    rawTexts: '',
    textCount: 0,
    blockCount: 0,
    previewMode: false,
    error: {
        title: { status: "", message: "" },
        blocks: { status: "", message: "" },
    },
}

export default function PageView(state = initialState, action) {
    switch (action.type) {
        case SET_PAGE:
            const setBlocks = action.page.blocks.map(b => { return { ...b, data: JSON.parse(b.data) } });
            const { textCount, blockCount, rawTexts, text, anchors } = convertToJSX(setBlocks);
            return {
                ...state,
                id: action.page.base.id,
                title: action.page.base.title,
                blocks: setBlocks,
                text: text,
                rawTexts: rawTexts,
                textCount: textCount,
                blockCount: blockCount,
                anchors: anchors,
                previewMode: false,
            };
        case CLEAR_PAGE:
            return { ...initialState }
        default:
            return state;
    }
}