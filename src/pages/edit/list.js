import React from "react"
import BookEditSEO from "components/seo/book-edit-seo"
import ContentEditList from "components/edit";
import VerticalLayout from "components/layout/vertical";

const BookEditPage = () => (
    <VerticalLayout activeMenuKey="edit">
        <BookEditSEO />
        <div style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto' }}>
            <ContentEditList />
        </div>
    </VerticalLayout>
)

export default BookEditPage