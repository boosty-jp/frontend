import React from "react"
import Layout from "components/layout/horizontal"
import SEO from "components/seo/seo"
import HeroComponent from "components/landing/hero"
import LanguageIconsComponent from "components/landing/icons"
import CreatorRequirementComponent from "components/landing/creator"
import ScreenComponent from "components/landing/screen"
import SalesPoints from "components/landing/sales-points"
import PickupComponent from "components/landing/pickup"
import TwitterComponent from "components/landing/twitter"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="オンライン技術書サービス" />
      <HeroComponent />
      <div style={{ margin: '0 auto', maxWidth: '900px', padding: "20px" }}>
        <div style={{ paddingTop: '100px' }}>
          <LanguageIconsComponent />
        </div>
        <div style={{ paddingTop: '160px', paddingBottom: '100px' }}>
          <ScreenComponent />
        </div>
        <div style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <SalesPoints />
        </div>
        <div style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <PickupComponent />
        </div>
        <div style={{ paddingTop: '40px', paddingBottom: '80px' }}>
          <TwitterComponent />
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
