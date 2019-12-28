const SUFFIX = '_COURSE_VIEW';
const SET_COURSE = 'SET_COURSE' + SUFFIX;
const CLEAR_COURSE = 'CLEAR_COURSE' + SUFFIX;
const TOGGLE_LIKE = 'TOGGLE_LIKE' + SUFFIX;
const TOGGLE_LEARN = 'TOGGLE_LEARN' + SUFFIX;

export const setCourse = (course) => ({
    type: SET_COURSE,
    course: course
})

export const clearBase = (course) => ({
    type: CLEAR_COURSE,
    course: course
})

export const toggleLike = () => ({
    type: TOGGLE_LIKE,
})

export const toggleLearn = () => ({
    type: TOGGLE_LEARN,
})

const initialState = {
    id: "",
    title: "",
    description: '',
    imageUrl: '',
    tags: [],
    actionCount: {
        likeCount: 0,
        learnedCount: 0,
    },
    accountAction: {
        liked: false,
        learned: false,
    },
}

export default function CourseView(state = initialState, action) {
    switch (action.type) {
        case SET_COURSE:
            return {
                ...state,
                id: action.base.id,
                title: action.base.title,
                imageUrl: action.base.imageUrl,
                description: action.base.description,
                tags: action.tags.concat(),
            };
        case CLEAR_COURSE:
            return { ...initialState }
        case TOGGLE_LIKE:
            const likeEntry = !state.accountAction.liked;
            const likeCount = likeEntry ? state.actionCount.likeCount + 1 : state.actionCount.likeCount - 1;
            return {
                ...state,
                accountAction: { ...state.accountAction, liked: likeEntry },
                actionCount: { ...state.actionCount, likeCount: likeCount }
            }
        case TOGGLE_LEARN:
            const learnEntry = !state.accountAction.learned;
            const learnedCount = learnEntry ? state.actionCount.learnedCount + 1 : state.actionCount.learnedCount - 1;
            return {
                ...state,
                accountAction: { ...state.accountAction, learned: learnEntry },
                actionCount: { ...state.actionCount, learnedCount: learnedCount }
            }
        default:
            return state;
    }
}