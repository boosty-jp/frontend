const SUFFIX = '_USER_VIEW';
const SET_USER_DATA = 'SET_USER_DATA' + SUFFIX;
const CLEAR_USER_DATA = 'CLEAR_USER_DATA' + SUFFIX;

export const setUserData = (user) => ({
    type: SET_USER_DATA,
    user: user,
})

export const clearUserData = () => ({
    type: CLEAR_USER_DATA,
})

const initialState = {
    id: "",
    name: "",
    imageUrl: '',
    description: '',
}

export default function User(state = initialState, action) {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                id: action.user.id,
                displayName: action.user.displayName,
                imageUrl: action.user.imageUrl,
                description: action.user.description,
            };
        case CLEAR_USER_DATA:
            return {
                ...initialState
            };
        default:
            return state;
    }
}