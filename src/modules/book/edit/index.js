import { getTagsError } from 'utils/content-validator';
const SUFFIX = '_BOOK_EDIT';
const SET_BOOK_DATA = 'SET_BOOK_DATA' + SUFFIX;
const SET_IMAGE_URL = 'SET_IMAGE_URL' + SUFFIX;
const CLEAR_BOOK_DATA = 'CLEAR_BOOK_DATA' + SUFFIX;
const ADD_TAGS = 'ADD_TAGS' + SUFFIX;
const UPDATE_TAGS = 'UPDATE_TAGS' + SUFFIX;
const ADD_SECTION = 'ADD_SECTION' + SUFFIX;
const UPDATE_SECTION_TITLE = 'UPDATE_SECTION_TITLE' + SUFFIX;
const DELETE_SECTION = 'DELETE_SECTION' + SUFFIX;
const DELETE_PAGE = 'DELETE_PAGE' + SUFFIX;
const REORDER_SECTIONS = 'REORDER_SECTIONS' + SUFFIX;
const REORDER_PAGES = 'REORDER_PAGES' + SUFFIX;
const UPDATE_PAGE_TRIAL_READ = 'UPDATE_PAGE_TRIAL_READ' + SUFFIX;
const PUBLISH = 'PUBLISH' + SUFFIX;
const SUSPEND = 'SUSPEND' + SUFFIX;

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

export const deletePage = (id) => ({
    type: DELETE_PAGE,
    id: id,
})

export const reorderSections = (sections) => ({
    type: REORDER_SECTIONS,
    sections: sections,
})

export const reorderPages = (sectionId, pages) => ({
    type: REORDER_PAGES,
    sectionId: sectionId,
    pages: pages
})

export const updateTrialRead = (sectionId, pageId, checked) => ({
    type: UPDATE_PAGE_TRIAL_READ,
    sectionId: sectionId,
    pageId: pageId,
    checked: checked
})

export const publish = () => ({
    type: PUBLISH,
})

export const suspend = () => ({
    type: SUSPEND,
})

const initialState = {
    id: "",
    imageUrl: '',
    title: "",
    description: '',
    price: '',
    canSale: false,
    features: [],
    levelStart: 0,
    levelEnd: 0,
    targetDescriptions: [],
    sections: [],
    status: "",
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
                canSale: action.book.canSale,
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
            const addedSections = state.sections.concat({ id: action.id, title: action.title, pages: [] })
            return {
                ...state,
                sections: addedSections,
            }
        case UPDATE_SECTION_TITLE:
            const updatedTitleSections = state.sections.map(s => {
                if (s.id === action.id) {
                    return ({ ...s, title: action.title })
                }
                return s;
            })

            return {
                ...state,
                sections: updatedTitleSections,
            }
        case DELETE_SECTION:
            return {
                ...state,
                sections: state.sections.filter(section => section.id !== action.id),
            }
        case DELETE_PAGE:
            return {
                ...state,
                sections: state.sections.map(section => {
                    return {
                        ...section,
                        pages: section.pages.filter(
                            page => page.id !== action.id
                        )
                    }
                }),
            }
        case REORDER_SECTIONS:
            return {
                ...state,
                sections: action.sections
            }
        case REORDER_PAGES:
            return {
                ...state,
                sections: state.sections.map(section => {
                    if (section.id === action.sectionId) {
                        return {
                            ...section,
                            pages: action.pages
                        }
                    }
                    return section;
                })
            }
        case UPDATE_PAGE_TRIAL_READ:
            const trialTargetSectionIdx = state.sections.findIndex((e) => action.sectionId === e.id);
            const trialTargetPageIdx = state.sections[trialTargetSectionIdx].pages.findIndex((e) => action.pageId === e.id);
            let updateTrialSections = state.sections.concat();
            updateTrialSections[trialTargetSectionIdx].pages[trialTargetPageIdx].canPreview = action.checked;
            return {
                ...state,
                sections: updateTrialSections
            }
        case PUBLISH:
            return {
                ...state,
                status: 'publish',
            }
        case SUSPEND:
            return {
                ...state,
                status: 'suspend',
            }
        default:
            return state;
    }
}