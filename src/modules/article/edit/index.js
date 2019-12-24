const SUFFIX = '_ARTICLE_EDIT';
const SET_ARTICLE = 'SET_ARTICLE' + SUFFIX;
const UPDATE_TITLE = 'UPDATE_TITLE' + SUFFIX;
const ADD_SKILL = 'ADD_SKILL' + SUFFIX;
const DELETE_SKILL = 'DELETE_SKILL' + SUFFIX;
const ADD_TAG = 'ADD_TAG' + SUFFIX;
const UPDATE_TAGS = 'UPDATE_TAGS' + SUFFIX;
const UPDATE_TEXT = 'UPDATE_TEXT' + SUFFIX;
const UPDATE_SKILL_DRAFT = 'UPDATE_SKILL_DRAFT' + SUFFIX;
const CLEAR_SKILL_DRAFT = 'CLEAR_SKILL_DRAFT' + SUFFIX;

export const setArticle = (article) => ({
    type: SET_ARTICLE,
    article: article
})

export const updateTitle = (title) => ({
    type: UPDATE_TITLE,
    title: title
})

export const addSkill = (skill) => ({
    type: ADD_SKILL,
    skill: skill,
})

export const deleteSkill = (id) => ({
    type: DELETE_SKILL,
    id: id,
})

export const addTag = (tag) => ({
    type: ADD_TAG,
    tag: tag
})

export const updateTags = (tags) => ({
    type: UPDATE_TAGS,
    tags: tags
})

export const updateText = (text, textCount, blockCount) => ({
    type: UPDATE_TEXT,
    text: text,
    textCount: textCount,
    blockCount: blockCount,
})

export const updateSkillDraft = (skillDraft) => ({
    type: UPDATE_SKILL_DRAFT,
    skillDraft: skillDraft
})

export const clearSkillDraft = () => ({
    type: CLEAR_SKILL_DRAFT,
})

const initialState = {
    id: "",
    title: "",
    imageUrl: "",
    status: "publish",
    text: '',
    textCount: 0,
    blockCount: 0,
    tags: [],
    skills: [],
    skillDraft: { id: "", name: "" },
}

export default function ArticleEdit(state = initialState, action) {
    switch (action.type) {
        case SET_ARTICLE:
            return {
                ...state,
                id: action.article.id,
                title: action.article.title,
                imageUrl: action.article.imageUrl,
                status: action.article.status,
                text: action.article.text,
                tags: action.article.tags,
                skills: action.article.skills,
            };
        case UPDATE_TITLE:
            return {
                ...state,
                title: action.title,
            }
        case ADD_SKILL:
            return {
                ...state,
                skills: [...state.skills, action.skill],
            }
        case UPDATE_SKILL_DRAFT:
            return {
                ...state,
                skillDraft: action.skillDraft,
            }
        case CLEAR_SKILL_DRAFT:
            return {
                ...state,
                skillDraft: { id: "", name: "" },
            }
        case DELETE_SKILL:
            const deleteSkills = state.skills.concat();
            let idx = -1;
            for (let i = 0; i < deleteSkills.length; ++i) {
                if (deleteSkills[i].id === action.id) {
                    idx = i;
                }
            }
            if (idx >= 0) {
                deleteSkills.splice(idx, 1);
                return {
                    ...state,
                    skills: deleteSkills,
                }
            } else {
                return { ...state }
            }
        case UPDATE_TAGS:
            return {
                ...state,
                tags: action.tags,
            }
        case ADD_TAG:
            return {
                ...state,
                tags: [...state.tags, action.tag],
            }
        case UPDATE_TEXT:
            return {
                ...state,
                text: action.text,
                textCount: action.textCount,
                blockCount: action.blockCount,
            }
        default:
            return state;
    }
}