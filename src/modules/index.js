import { combineReducers } from 'redux';
import BookView from 'modules/book/view'
import BookEdit from 'modules/book/edit'
import BookGenerator from 'modules/book/edit/generator'
import PageView from 'modules/page/view'
import PageEdit from 'modules/page/edit'
import ArticleEdit from 'modules/article/edit'
import User from 'modules/user/index'

const reducers = combineReducers({
    bookView: BookView,
    bookEdit: BookEdit,
    bookGenerator: BookGenerator,
    pageView: PageView,
    pageEdit: PageEdit,
    articleEdit: ArticleEdit,
    user: User,
});

export default reducers;