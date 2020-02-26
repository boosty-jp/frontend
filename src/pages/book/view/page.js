import React from "react"
import SEO from "components/seo"
import withLocation from "components/wrapper/location";
import { connect } from 'react-redux'
import PageView from 'components/book/view/page/index'
import { clearPage } from 'modules/page/edit'
import PageViewLayout from "components/layout/page-view-layout";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const BookPreviewPageComponent = (props) => {
    const { id, bookId } = props.search
    if (!id || !bookId) navigate("/404");
    props.clearPage();

    return (
        <PageViewLayout id={id} bookId={bookId}>
            <SEO title="Home" />
            <div style={{ background: 'white' }}>
                <div style={{ padding: '20px 0px', maxWidth: '740px', margin: 'auto' }}>
                    <PageView id={id} bookId={bookId} />
                </div>
            </div>
        </PageViewLayout>
    )
}

const mapDispatchToProps = dispatch => ({
    clearPage: (page) => dispatch(clearPage(page)),
})

const BookPreviewPage = connect(null, mapDispatchToProps)(BookPreviewPageComponent)
export default withLocation(BookPreviewPage)