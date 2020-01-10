import { combineReducers } from 'redux';
import ArticleView from 'modules/article/view'
import ArticleEdit from 'modules/article/edit'
import CourseView from 'modules/course/view'
import CourseEditBase from 'modules/course/edit/base'
import CourseEditSections from 'modules/course/edit/sections'
import CourseEditSection from 'modules/course/edit/section'
import TestView from 'modules/test/view'
import TestEditBase from 'modules/test/edit/base'
import TestEditQuestion from 'modules/test/edit/question'
import TestEditQuestions from 'modules/test/edit/questions'
import TestEditExplanation from 'modules/test/edit/explanation'
import ReferenceArticle from 'modules/test/edit/reference-article'

const reducers = combineReducers({
    articleView: ArticleView,
    articleEdit: ArticleEdit,
    courseView: CourseView,
    courseEditBase: CourseEditBase,
    courseEditSections: CourseEditSections,
    courseEditSection: CourseEditSection,
    testView: TestView,
    testEditBase: TestEditBase,
    testEditQuestion: TestEditQuestion,
    testEditQuestions: TestEditQuestions,
    testEditExplanation: TestEditExplanation,
    referenceArticle: ReferenceArticle,
});

export default reducers;