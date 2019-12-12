import { connect } from 'react-redux'
import TagSelectForm from 'components/search/tag-form'
import { updateTags, addTag } from 'modules/course/edit/base'

const mapStateToProps = state => ({
    tags: state.courseEditBase.tags,
})

const mapDispatchToProps = dispatch => ({
    updateTags: (tags) => dispatch(updateTags(tags)),
    addTag: (tag) => dispatch(addTag(tag)),
})

const CourseTagSelectForm = connect(mapStateToProps, mapDispatchToProps)(TagSelectForm)
export default CourseTagSelectForm