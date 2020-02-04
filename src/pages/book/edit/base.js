import React from "react"
import SEO from "components/seo"
import Layout from "components/layout/horizontal"
import BookEditLayout from 'components/book/edit/layout'
import BookBaseUpdateForm from 'components/book/edit/base'

const BookEditPage = () => (
    <Layout>
        <SEO title="Home" />
        <div style={{ background: 'white' }}>
            <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
                <BookEditLayout page="base">
                    <BookBaseUpdateForm />
                </BookEditLayout>
            </div>
        </div>
    </Layout>
)

export default BookEditPage