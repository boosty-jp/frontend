import { detectBookViewMode } from 'utils/book-view-mode-handler'

const SUFFIX = '_BOOK_VIEW';
const SET_BOOK_DATA = 'SET_BOOK_DATA' + SUFFIX;
const CLEAR_BOOK_DATA = 'CLEAR_BOOK_DATA' + SUFFIX;
const LIKE_BOOK = 'LIKE_BOOK' + SUFFIX;
const UNLIKE_BOOK = 'UNLIKE_BOOK' + SUFFIX;

export const setBookData = (book) => ({
    type: SET_BOOK_DATA,
    book: book,
    mode: detectBookViewMode(book),
})

export const likeBook = () => ({
    type: LIKE_BOOK,
})

export const unLikeBook = () => ({
    type: UNLIKE_BOOK,
})

export const clearBookData = () => ({
    type: CLEAR_BOOK_DATA,
})

const initialState = {
    id: "",
    imageUrl: '',
    title: "",
    description: '',
    price: '',
    features: [],
    levelStart: 0,
    levelEnd: 0,
    targetDescriptions: [],
    sections: [],
    lastViewedPageId: "",
    status: "",
    purchased: false,
    liked: false,
    likedCount: 0,
    author: {
        id: '',
        displayName: '',
        imageUrl: '',
        description: '',
        url: '',
        twitterId: '',
        githubId: '',
    },
    tags: [],
    updateDate: '',
    mode: 'purchase',
    error: {
        image: { status: "", message: "" },
        base: { status: "", message: "" },
        page: { status: "", message: "" },
        features: { status: "", message: "" },
        target: { status: "", message: "" },
        tags: { status: "", message: "" },
    },
}

export default function BookView(state = initialState, action) {
    switch (action.type) {
        case SET_BOOK_DATA:
            return {
                ...state,
                id: action.book.id,
                imageUrl: action.book.imageUrl,
                title: action.book.title,
                price: action.book.price,
                description: action.book.description,
                features: action.book.features,
                purchased: action.book.purchased,
                liked: action.book.liked,
                likedCount: action.book.likedCount,
                levelStart: action.book.targets.levelStart,
                levelEnd: action.book.targets.levelEnd,
                targetDescriptions: action.book.targets.targetDescriptions,
                lastViewedPageId: action.book.lastViewedPageId,
                status: action.book.status,
                tags: action.book.tags,
                sections: action.book.sections,
                author: action.book.author,
                updateDate: action.book.updateDate,
                mode: action.mode,
            };
        case CLEAR_BOOK_DATA:
            return {
                ...initialState
            };
        case LIKE_BOOK:
            const addedCount = state.likedCount + 1;
            return {
                ...state,
                liked: true,
                likedCount: addedCount
            }
        case UNLIKE_BOOK:
            return {
                ...state,
                liked: false,
                likedCount: state.likedCount - 1
            }
        default:
            return state;
    }
}