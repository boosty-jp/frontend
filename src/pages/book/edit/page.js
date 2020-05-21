import React from "react"
import BookEditSEO from "components/seo/book-edit-seo"
import withLocation from "components/wrapper/location";
import { connect } from 'react-redux'
import PageEdit from 'components/book/edit/page/index'
import PageEditLayout from "components/layout/page-edit-layout";
import { clearPage } from 'modules/page/edit/index'

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const BookEditPageComponent = (props) => {
    const { id, bookId } = props.search
    if (!id || !bookId) navigate("/404");
    props.clearPage();

    return (
        <PageEditLayout bookId={bookId}>
            <BookEditSEO />
            <div style={{ backgroundColor: '#F7FAFF' }}>
                <div style={{ padding: '20px 0px', maxWidth: '900px', margin: 'auto' }}>
                    <PageEdit id={id} />
                </div>
            </div>
        </PageEditLayout>
    )
}

const mapDispatchToProps = dispatch => ({
    clearPage: (page) => dispatch(clearPage(page)),
})

const BookEditPage = connect(null, mapDispatchToProps)(BookEditPageComponent)
export default withLocation(BookEditPage)