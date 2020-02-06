import React from "react"
import SEO from "components/seo"
import Layout from "components/layout/horizontal"
import BookEditList from "components/book/edit/list";

const BookEditPage = () => (
    <Layout>
        <SEO title="Home" />
        <div style={{ background: 'white' }}>
            <BookEditList />
        </div>
    </Layout>
)

export default BookEditPage