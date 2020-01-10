import { getTitleError, getReferenceCourseError, getDescriptionError } from 'utils/content-validator';

const SUFFIX = '_TEST_BASE_EDIT';
const SET_BASE = 'SET_BASE' + SUFFIX;
const CLEAR_BASE = 'CLEAR_BASE' + SUFFIX;
const UPDATE_TITLE = 'UPDATE_TITLE' + SUFFIX;
const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION' + SUFFIX;
const UPDATE_REFERENCE_COURSE = 'UPDATE_REFERENCE_COURSE' + SUFFIX;
const CLEAR_REFERENCE_COURSE = 'CLEAR_REFERENCE_COURSE' + SUFFIX;

export const setBase = (test) => ({
    type: SET_BASE,
    test: test
})

export const clearBase = () => ({
    type: CLEAR_BASE,
})

export const updateTitle = (title) => ({
    type: UPDATE_TITLE,
    title: title,
    error: getTitleError(title)
})

export const updateDescription = (description) => ({
    type: UPDATE_DESCRIPTION,
    description: description,
    error: getDescriptionError(description)
})

export const updateReferenceCourse = (referenceCourse) => ({
    type: UPDATE_REFERENCE_COURSE,
    referenceCourse: referenceCourse,
    error: getReferenceCourseError(referenceCourse)
})

export const clearReferenceCourse = () => ({
    type: CLEAR_REFERENCE_COURSE,
})

const initialState = {
    id: "",
    title: "Javaパフォーマンス計測 そんなタイマーで大丈夫か？",
    description: '99.9%以上の確率で0が表示される。そもそもSystem.currentTimeMillis()は時刻をミリ秒で返す。1行のプログラムを実行するのに1ミリ秒もかかってたら、たかだか1000行分動いただけで1秒かかってしまう。今のコンピュータはそんなに遅くない。',
    referenceCourse: { id: "a4b7a584-5c67-45aa-9b90-c47c4af27008", name: "react入門", imageUrl: "" },
    status: "publish",
    error: {
        title: { status: "", message: "" },
        description: { status: "", message: "" },
        referenceCourse: { status: "", message: "" },
    },
}

export default function TestEditBase(state = initialState, action) {
    switch (action.type) {
        case SET_BASE:
            return {
                ...state,
                id: action.test.id,
                title: action.test.title,
                description: action.test.description,
                referenceCourse: action.test.referenceCourse,
                status: action.test.status,
                tags: action.test.tags
            };
        case CLEAR_BASE:
            return {
                ...initialState
            };
        case UPDATE_TITLE:
            return {
                ...state,
                title: action.title,
                error: { ...state.error, title: action.error },
            }
        case UPDATE_DESCRIPTION:
            return {
                ...state,
                description: action.description,
                error: { ...state.error, description: action.error },
            }
        case UPDATE_REFERENCE_COURSE:
            return {
                ...state,
                referenceCourse: {
                    id: action.referenceCourse.id,
                    title: action.referenceCourse.title,
                    description: action.referenceCourse.description,
                    imageUrl: action.referenceCourse.imageUrl,
                    status: action.referenceCourse.status,
                    createDate: action.referenceCourse.createDate,
                    updateDate: action.referenceCourse.updateDate,

                    tags: action.referenceCourse.tags.concat(),
                    sections: action.referenceCourse.sections.concat(),
                    author: action.referenceCourse.author,

                    actionCount: action.referenceCourse.actionCount,
                    accountAction: action.referenceCourse.accountAction,
                    learnStatus: action.referenceCourse.learnStatus,
                },
                error: { ...state.error, referenceCourse: action.error },
            };
        case CLEAR_REFERENCE_COURSE:
            return {
                ...state,
                referenceCourse: {}
            }
        default:
            return state;
    }
}