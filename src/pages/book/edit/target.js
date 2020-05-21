import React from "react"
import BookEditSEO from "components/seo/book-edit-seo"
import VerticalLayout from "components/layout/vertical";
import BookEditLayout from 'components/book/edit/layout'
import BookEditTargetPoints from "components/book/edit/target"
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
                    <BookEditLayout page="target" id={id}>
                        <BookEditTargetPoints id={id} />
                    </BookEditLayout>
                </div>
            </div>
        </VerticalLayout>
    )
}

export default withLocation(BookEditPage)