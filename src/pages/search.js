import React from "react"
import SEO from "components/seo/seo"
import VerticalLayout from "components/layout/vertical"
import SearchComponent from "components/search/book"

const SearchPage = () => (
    <VerticalLayout activeMenuKey="search">
        <SEO title="検索" description="キーワードより技術書をお探しできます。" />
        <div style={{ padding: '20px', margin: '20px auto' }}>
            <SearchComponent />
        </div>
    </VerticalLayout>
)

export default SearchPage