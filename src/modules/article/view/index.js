import { convertToJSX } from 'utils/html-converter';

const SUFFIX = '_ARTICLE_VIEW';
const SET_ARTICLE = 'SET_ARTICLE' + SUFFIX;
const CLEAR_ARTICLE = 'CLEAR_ARTICLE' + SUFFIX;

export const clearArticle = () => ({
    type: CLEAR_ARTICLE,
})

export const setArticle = (article) => ({
    type: SET_ARTICLE,
    article: article
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
}

export default function ArticleEdit(state = initialState, action) {
    switch (action.type) {
        case CLEAR_ARTICLE:
            return { ...initialState }
        case SET_ARTICLE:
            const parsedBlocks = action.article.blocks.map(b => { return { type: b.type, data: JSON.parse(b.data) } })
            const { text, anchors } = convertToJSX(parsedBlocks);
            console.log(anchors);
            return {
                ...state,
                id: action.article.id,
                title: action.article.title,
                imageUrl: action.article.imageUrl,
                anchors: anchors,
                blocks: action.article.blocks,
                text: text,
                status: action.article.status,
                tags: action.article.tags,
                skills: action.article.skills,
            };
        default:
            return state;
    }
}