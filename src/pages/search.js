import React from "react"
import Layout from "components/layout/horizontal"
import SEO from "components/seo"
import SearchCategoryForm from "components/search/category";
import SearchResults from "components/search/result";
import TwoColumnLayout from "components/layout/two-column";

const IndexPage = () => (
    <Layout>
        <SEO title="Home" />
        <SearchCategoryForm />
        <TwoColumnLayout
            left={
                <SearchResults />
            }
            right={
                <>
                </>
            }
        />
    </Layout>
)

export default IndexPage