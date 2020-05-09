import React from "react"

import SEO from "components/seo/seo"
import VerticalLayout from "components/layout/vertical"
import LikedPageList from "components/book/view/list/like-list"

const LikedPage = () => (
    <VerticalLayout activeMenuKey="like">
        <SEO title="DEMO" />
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <LikedPageList />
        </div>
    </VerticalLayout>
)

export default LikedPage