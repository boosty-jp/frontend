import { getTagsError, getSectionsError } from 'utils/content-validator';
const SUFFIX = '_BOOK_EDIT';
const SET_BOOK_DATA = 'SET_BOOK_DATA' + SUFFIX;
const SET_IMAGE_URL = 'SET_IMAGE_URL' + SUFFIX;
const CLEAR_BOOK_DATA = 'CLEAR_BOOK_DATA' + SUFFIX;
const ADD_TAGS = 'ADD_TAGS' + SUFFIX;
const UPDATE_TAGS = 'UPDATE_TAGS' + SUFFIX;
const ADD_SECTION = 'ADD_SECTION' + SUFFIX;
const UPDATE_SECTION_TITLE = 'UPDATE_SECTION_TITLE' + SUFFIX;
const DELETE_SECTION = 'DELETE_SECTION' + SUFFIX;

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

export const updateTags = (tags) => ({
    type: UPDATE_TAGS,
    tags: tags,
    error: getTagsError(tags)
})

export const addTag = (tag) => ({
    type: ADD_TAGS,
    tag: tag
})

export const addSection = (id, title) => ({
    type: ADD_SECTION,
    id: id,
    title: title
})

export const updateSectionTitle = (id, title) => ({
    type: UPDATE_SECTION_TITLE,
    id: id,
    title: title
})

export const deleteSection = (id) => ({
    type: DELETE_SECTION,
    id: id,
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
        case ADD_TAGS:
            return {
                ...state,
                tags: [...state.tags, action.tag],
            }
        case UPDATE_TAGS:
            return {
                ...state,
                tags: action.tags,
                error: { ...state.error, tags: action.error },
            }
        case ADD_SECTION:
            const addedSections = state.sections.concat({ id: action.id, title: action.title })
            return {
                ...state,
                sections: addedSections,
            }
        case UPDATE_SECTION_TITLE:
            return {
                ...state,
                sections: state.sections.filter(section => section.id !== action.id).concat({ id: action.id, title: action.title })
            }
        case DELETE_SECTION:
            return {
                ...state,
                sections: state.sections.filter(section => section.id !== action.id),
            }
        default:
            return state;
    }
}