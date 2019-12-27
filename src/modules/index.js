import { combineReducers } from 'redux';
import ArticleView from 'modules/article/view'
import ArticleEdit from 'modules/article/edit'
import CourseEditBase from 'modules/course/edit/base'
import CourseEditSections from 'modules/course/edit/sections'
import CourseEditSection from 'modules/course/edit/section'

const reducers = combineReducers({
    articleView: ArticleView,
    articleEdit: ArticleEdit,
    courseEditBase: CourseEditBase,
    courseEditSections: CourseEditSections,
    courseEditSection: CourseEditSection,
});

export default reducers;