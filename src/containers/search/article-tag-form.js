import { connect } from 'react-redux'
import TagSelectForm from 'components/search/tag-form'
import { updateTags, addTag } from 'modules/article/edit'

const mapStateToProps = state => ({
    tags: state.articleEdit.tags,
})

const mapDispatchToProps = dispatch => ({
    updateTags: (tags) => dispatch(updateTags(tags)),
    addTag: (tag) => dispatch(addTag(tag)),
})

const ArticleTagSelectForm = connect(mapStateToProps, mapDispatchToProps)(TagSelectForm)
export default ArticleTagSelectForm