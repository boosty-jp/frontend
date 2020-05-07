import React from "react"
import Layout from "components/layout/horizontal"
import SEO from "components/seo"
import HeroComponent from "components/landing/hero"
import LanguageIconsComponent from "components/landing/icons"
import BookCategoryComponent from "components/landing/category"
import CreatorRequirementComponent from "components/landing/creator"
import ScreenComponent from "components/landing/screen"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <HeroComponent />
      <div style={{ margin: '0 auto', maxWidth: '900px', padding: "20px" }}>
        <div style={{ paddingTop: '100px' }}>
          <LanguageIconsComponent />
        </div>
        <div style={{ paddingTop: '160px', paddingBottom: '100px' }}>
          <ScreenComponent />
        </div>
        {/* <div style={{ paddingTop: '160px', paddingBottom: '100px' }}>
          <BookCategoryComponent />
        </div> */}
      </div>
      <CreatorRequirementComponent />
    </Layout>
  )
}

export default IndexPage
