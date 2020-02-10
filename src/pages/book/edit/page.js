import React from "react"
import SEO from "components/seo"
import withLocation from "components/wrapper/location";
import PageEdit from 'components/book/edit/page/index'
import PageEditLayout from "components/layout/page-edit-layout";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const BookEditPage = (props) => {
    const { id, bookId } = props.search
    if (!id || !bookId) navigate("/404");

    return (
        <PageEditLayout bookId={bookId}>
            <SEO title="Home" />
            <div style={{ background: 'white' }}>
                <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
                    <PageEdit id={id} />
                </div>
            </div>
        </PageEditLayout>
    )
}

export default withLocation(BookEditPage)