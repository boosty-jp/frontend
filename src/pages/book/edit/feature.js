import React from "react"
import SEO from "components/seo"
import VerticalLayout from "components/layout/vertical"
import BookEditLayout from 'components/book/edit/layout'
import BookEditFeatures from "components/book/edit/feature"
import withLocation from "components/wrapper/location";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const BookEditFeaturePage = (props) => {
    const { id } = props.search
    if (!id) navigate("/404");

    return (
        <VerticalLayout activeMenuKey="edit">
            <SEO title="Home" />
            <div style={{ backgroundColor: '#F7FAFF' }}>
                <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
                    <BookEditLayout page="feature" id={id}>
                        <BookEditFeatures id={id} />
                    </BookEditLayout>
                </div>
            </div>
        </VerticalLayout>
    )
}

export default withLocation(BookEditFeaturePage)