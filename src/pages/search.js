import React from "react"
import Layout from "components/layout/horizontal"
import SEO from "components/seo"
import SearchCategoryForm from "components/search/category";
import SearchResults from "components/search/result";
import TwoColumnLayout from "components/layout/two-column";
import TopicCategoryCard from "components/category/topic-card"
import TopicUserCard from "components/account/topic-card";

const IndexPage = () => (
    <Layout>
        <SEO title="Home" />
        {/* <SearchForm /> */}
        <SearchCategoryForm />
        <TwoColumnLayout
            left={
                <SearchResults />
            }
            right={
                <>
                    <TopicCategoryCard />
                    <TopicUserCard />
                </>
            }
        />
    </Layout>
)

export default IndexPage