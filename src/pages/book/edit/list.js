import React from "react"
import SEO from "components/seo"
import BookEditList from "components/book/edit/list";
import VerticalLayout from "components/layout/vertical";

const BookEditPage = () => (
    <VerticalLayout activeMenuKey="edit">
        <SEO title="Home" />
        <div style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto' }}>
            <BookEditList />
        </div>
    </VerticalLayout>
)

export default BookEditPage