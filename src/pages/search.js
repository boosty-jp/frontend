import React from "react"
import SEO from "components/seo"
import VerticalLayout from "components/layout/vertical"
import SearchComponent from "components/search/book"

const SearchPage = () => (
    <VerticalLayout activeMenuKey="search">
        <SEO title="DEMO" />
        <div style={{ padding: '20px', margin: '20px auto' }}>
            <SearchComponent />
        </div>
    </VerticalLayout>
)

export default SearchPage