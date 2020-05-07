const SUFFIX = '_PAGE_VIEW';
const SET_PAGE = 'SET_PAGE' + SUFFIX;
const CLEAR_PAGE = 'CLEAR_PAGE' + SUFFIX;
const LIKE_PAGE = 'LIKE_PAGE' + SUFFIX;
const UNLIKE_PAGE = 'UNLIKE_PAGE' + SUFFIX;

export const setPage = (page) => ({
    type: SET_PAGE,
    page: page
})

export const clearPage = () => ({
    type: CLEAR_PAGE,
})

export const likePage = () => ({
    type: LIKE_PAGE,
})

export const unLikePage = () => ({
    type: UNLIKE_PAGE,
})

const initialState = {
    id: "",
    title: "",
    text: '',
    liked: false,
    likeCount: 0,
    canPreview: false,
    previewMode: false,
    error: {
        title: { status: "", message: "" },
        blocks: { status: "", message: "" },
    },
}

export default function PageView(state = initialState, action) {
    switch (action.type) {
        case SET_PAGE:
            return {
                ...state,
                id: action.page.id,
                title: action.page.title,
                text: action.page.text,
                liked: action.page.liked,
                likeCount: action.page.likeCount,
                previewMode: false,
            };
        case CLEAR_PAGE:
            return { ...initialState }
        case LIKE_PAGE:
            const addedCount = state.likeCount + 1;
            return {
                ...state,
                liked: true,
                likeCount: addedCount
            }
        case UNLIKE_PAGE:
            return {
                ...state,
                liked: false,
                likeCount: state.likeCount - 1
            }
        default:
            return state;
    }
}