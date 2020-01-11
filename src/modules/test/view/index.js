const SUFFIX = '_TEST_VIEW';
const SET_TEST = 'SET_TEST' + SUFFIX;
const CLEAR_TEST = 'CLEAR_TEST' + SUFFIX;

export const setTest = (test) => ({
    type: SET_TEST,
    test: test
})

export const clearTest = () => ({
    type: CLEAR_TEST,
})

const initialState = {
    id: "",
    title: "",
    description: "",
    referenceCourse: {},
    createDate: "",
    updateDate: "",
    status: "publish",
    author: {},
}

export default function TestEditBase(state = initialState, action) {
    switch (action.type) {
        case SET_TEST:
            return {
                ...state,
                id: action.test.id,
                title: action.test.title,
                description: action.test.description,
                referenceCourse: action.test.referenceCourse,
                createDate: action.test.createDate,
                updateDate: action.test.updateDate,
                status: action.test.status,
                author: action.test.author,
            };
        case CLEAR_TEST:
            return {
                ...initialState
            };
        default:
            return state;
    }
}