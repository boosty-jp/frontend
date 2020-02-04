import React from "react"
import SEO from "components/seo"
import Layout from "components/layout/horizontal"
import BookEditLayout from 'components/book/edit/layout'
import BookEditSectionsComponent from "components/book/edit/section"

const BookEditPage = () => (
    <Layout>
        <SEO title="Home" />
        <div style={{ background: 'white' }}>
            <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
                <BookEditLayout page="page">
                    <BookEditSectionsComponent />
                </BookEditLayout>
            </div>
        </div>
    </Layout>
)

export default BookEditPage