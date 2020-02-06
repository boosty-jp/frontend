import React from "react"
import SEO from "components/seo"
import Layout from "components/layout/horizontal"
import BookEditLayout from 'components/book/edit/layout'
import BookEditFeatures from "components/book/edit/feature"
import withLocation from "components/wrapper/location";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const BookEditFeaturePage = (props) => {
    const { id } = props.search
    if (!id) navigate("/404");

    return (
        <Layout>
            <SEO title="Home" />
            <div style={{ background: 'white' }}>
                <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
                    <BookEditLayout page="feature" id={id}>
                        <BookEditFeatures id={id} />
                    </BookEditLayout>
                </div>
            </div>
        </Layout>
    )
}

export default withLocation(BookEditFeaturePage)