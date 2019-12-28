import { convertToJSX } from 'utils/html-converter';

const SUFFIX = '_ARTICLE_VIEW';
const SET_ARTICLE = 'SET_ARTICLE' + SUFFIX;
const CLEAR_ARTICLE = 'CLEAR_ARTICLE' + SUFFIX;
const TOGGLE_LIKE = 'TOGGLE_LIKE' + SUFFIX;
const TOGGLE_LEARN = 'TOGGLE_LEARN' + SUFFIX;

export const clearArticle = () => ({
    type: CLEAR_ARTICLE,
})

export const setArticle = (article) => ({
    type: SET_ARTICLE,
    article: article
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
    imageUrl: "",
    status: "publish",
    anchors: [],
    blocks: [],
    text: '',
    textCount: 0,
    blockCount: 0,
    tags: [],
    skills: [],
    author: {},
    actionCount: {
        likeCount: 0,
        learnedCount: 0,
    },
    accountAction: {
        liked: false,
        learned: false,
    },
    createDate: '',
    updateDate: '',
}

export default function ArticleView(state = initialState, action) {
    switch (action.type) {
        case CLEAR_ARTICLE:
            return { ...initialState }
        case SET_ARTICLE:
            const parsedBlocks = action.article.blocks.map(b => { return { type: b.type, data: JSON.parse(b.data) } })
            const { text, anchors } = convertToJSX(parsedBlocks);
            return {
                ...state,
                id: action.article.id,
                title: action.article.title,
                imageUrl: action.article.imageUrl,
                createDate: action.article.createDate,
                updateDate: action.article.updateDate,
                anchors: anchors,
                blocks: action.article.blocks,
                author: action.article.author,
                text: text,
                status: action.article.status,
                tags: action.article.tags,
                skills: action.article.skills,
                actionCount: action.article.actionCount,
                accountAction: action.article.accountAction,
            };
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