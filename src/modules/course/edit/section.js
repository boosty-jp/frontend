const SUFFIX = '_COURSE_SECTION_EDIT';
const SET_SECTION = 'SET_SECTION' + SUFFIX;
const CLEAR_SECTION = 'CLEAR_SECTION' + SUFFIX;
const UPDATE_TITLE = 'UPDATE_TITLE' + SUFFIX;
const ADD_ARTICLE = 'ADD_ARTICLE' + SUFFIX;
const UPDATE_ARTICLES = 'UPDATE_ARTICLES' + SUFFIX;
const DELETE_ARTICLE = 'DELETE_ARTICLE' + SUFFIX;

export const setSection = (title, articles) => ({
    type: SET_SECTION,
    title: title,
    articles: articles,
})

export const updateTitle = (title) => ({
    type: UPDATE_TITLE,
    title: title
})

export const addArticle = (article) => ({
    type: ADD_ARTICLE,
    article: article,
})

export const updateArticles = (articles) => ({
    type: UPDATE_ARTICLES,
    articles: articles
})

export const deleteArticle = (id) => ({
    type: DELETE_ARTICLE,
    id: id,
})

export const clearSection = () => ({
    type: CLEAR_SECTION,
})

const initialState = {
    title: '',
    articles: []
}

export default function CourseEditSection(state = initialState, action) {
    switch (action.type) {
        case SET_SECTION:
            return {
                ...state,
                title: action.title,
                articles: action.articles,
            };
        case CLEAR_SECTION:
            return {
                ...initialState,
            };
        case UPDATE_TITLE:
            return {
                ...state,
                title: action.title,
            }
        case ADD_ARTICLE:
            return {
                ...state,
                articles: [...state.articles, action.article],
            }
        case UPDATE_ARTICLES:
            return {
                ...state,
                articles: action.articles,
            }
        case DELETE_ARTICLE:
            const deleteArticles = state.articles.concat();
            let idx = -1;
            for (let i = 0; i < deleteArticles.length; ++i) {
                if (deleteArticles[i].id === action.id) {
                    idx = i;
                }
            }

            if (idx >= 0) {
                deleteArticles.splice(idx, 1);
                return {
                    ...state,
                    articles: deleteArticles,
                }
            } else {
                return { ...state }
            }
        default:
            return state;
    }
}