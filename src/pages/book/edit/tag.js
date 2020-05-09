import React from "react"
import BookEditSEO from "components/seo/book-edit-seo"
import VerticalLayout from "components/layout/vertical";
import BookEditLayout from 'components/book/edit/layout'
import BookEditTags from "components/book/edit/tag"
import withLocation from "components/wrapper/location";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const BookEditPage = (props) => {
    const { id } = props.search
    if (!id) navigate("/404");

    return (
        <VerticalLayout activeMenuKey="edit">
            <BookEditSEO />
            <div style={{ backgroundColor: '#F7FAFF' }}>
                <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
                    <BookEditLayout page="tag" id={id}>
                        <BookEditTags id={id} />
                    </BookEditLayout>
                </div>
            </div>
        </VerticalLayout>
    )
}

export default withLocation(BookEditPage)