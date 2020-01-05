const SUFFIX = '_REFERENCE_ARTICLE';
const SET_ARTICLE_ID = 'SET_ARTICLE_ID' + SUFFIX;
const SET_ARTICLE = 'SET_ARTICLE' + SUFFIX;
const CLEAR_ARTICLE = 'CLEAR_ARTICLE' + SUFFIX;

export const setArticleId = (id) => ({
    type: SET_ARTICLE_ID,
    id: id
})

export const setArticle = (article) => ({
    type: SET_ARTICLE,
    article: article
})

export const clearArticle = () => ({
    type: CLEAR_ARTICLE,
})

const initialState = {
    id: "",
    title: "",
    imageUrl: "",
    status: "publish",
    blocks: [],
    tags: [],
    skills: [],
    author: {},
}

export default function ReferenceArticle(state = initialState, action) {
    switch (action.type) {
        case SET_ARTICLE_ID:
            return {
                ...state,
                id: action.id,
            };

        case SET_ARTICLE:
            const parsedBlocks = action.article.blocks.map(b => { return { id: b.id, type: b.type, data: JSON.parse(b.data) } })
            return {
                ...state,
                id: action.article.id,
                title: action.article.title,
                imageUrl: action.article.imageUrl,
                blocks: parsedBlocks,
                author: action.article.author,
                status: action.article.status,
                tags: action.article.tags,
                skills: action.article.skills,
                createDate: action.article.createDate,
                updateDate: action.article.updateDate,
            };
        case CLEAR_ARTICLE:
            return {
                ...initialState
            };
        default:
            return state;
    }
}