import React from "react"
import SEO from "components/seo"
import withLocation from "components/wrapper/location";
import Layout from "components/layout/horizontal"
import BookEditLayout from 'components/book/edit/layout'
import BookBaseUpdateForm from 'components/book/edit/base'

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const BookEditPage = (props) => {
    const { id } = props.search
    if (!id) navigate("/404");

    return (
        <Layout>
            <SEO title="Home" />
            <div style={{ backgroundColor: '#f0f5ff' }}>
                <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
                    <BookEditLayout page="base" id={id}>
                        <BookBaseUpdateForm id={id} />
                    </BookEditLayout>
                </div>
            </div>
        </Layout>
    )
}

export default withLocation(BookEditPage)