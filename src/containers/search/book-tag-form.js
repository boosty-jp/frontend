import { connect } from 'react-redux'
import TagSelectForm from 'components/search/tag-form'
import { updateTags, addTag } from 'modules/book/edit'

const mapStateToProps = state => ({
    tags: state.bookEdit.tags,
})

const mapDispatchToProps = dispatch => ({
    updateTags: (tags) => dispatch(updateTags(tags)),
    addTag: (tag) => dispatch(addTag(tag)),
})

const BookTagSelectForm = connect(mapStateToProps, mapDispatchToProps)(TagSelectForm)
export default BookTagSelectForm