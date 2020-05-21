import React from "react"
import withLocation from "components/wrapper/location";
import VerticalLayout from "components/layout/vertical"
import BookEditLayout from 'components/book/edit/layout'
import BookBaseUpdateForm from 'components/book/edit/base'
import BookEditSEO from "components/seo/book-edit-seo";

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
                    <BookEditLayout page="base" id={id}>
                        <BookBaseUpdateForm id={id} />
                    </BookEditLayout>
                </div>
            </div>
        </VerticalLayout>
    )
}

export default withLocation(BookEditPage)