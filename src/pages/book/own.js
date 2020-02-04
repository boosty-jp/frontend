import React from "react"

import SEO from "components/seo"
import ContentLayout from "components/layout/content-layout"
import OwnBookList from "components/book/view/list/own-list"

const OwnedBookPage = () => (
    <ContentLayout>
        <SEO title="DEMO" />
        <div style={{ maxWidth: "900px", margin: 'auto', padding: '20px' }}>
            <OwnBookList />
        </div>
    </ContentLayout>
)

export default OwnedBookPage