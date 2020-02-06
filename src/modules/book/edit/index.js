const SUFFIX = '_BOOK_EDIT';
const SET_BOOK_DATA = 'SET_BOOK_DATA' + SUFFIX;
const SET_IMAGE_URL = 'SET_IMAGE_URL' + SUFFIX;
const CLEAR_BOOK_DATA = 'CLEAR_BOOK_DATA' + SUFFIX;

export const setBookData = (book) => ({
    type: SET_BOOK_DATA,
    book: book
})

export const clearBookData = () => ({
    type: CLEAR_BOOK_DATA,
})

export const setImageUrl = (imageUrl) => ({
    type: SET_IMAGE_URL,
    imageUrl: imageUrl
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
    status: "draft",
    tags: [],
    error: {
        image: { status: "", message: "" },
        base: { status: "", message: "" },
        page: { status: "", message: "" },
        features: { status: "", message: "" },
        target: { status: "", message: "" },
        tags: { status: "", message: "" },
    },
}

export default function BookEdit(state = initialState, action) {
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
                levelStart: action.book.targets.levelStart,
                levelEnd: action.book.targets.levelEnd,
                targetDescriptions: action.book.targets.targetDescriptions,
                status: action.book.status,
                tags: action.book.tags,
                sections: action.book.sections,
            };
        case SET_IMAGE_URL:
            return {
                ...state,
                imageUrl: action.imageUrl
            }
        case CLEAR_BOOK_DATA:
            return {
                ...initialState
            };
        default:
            return state;
    }
}