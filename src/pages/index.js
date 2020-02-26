import React from "react"
import Layout from "components/layout/horizontal"
import SEO from "components/seo"
import TwoColumnLayout from "components/layout/two-column"
import HeroComponent from "components/landing/hero"
import CreatorComponent from "components/landing/creator"
import LanguageIconsComponent from "components/landing/icons"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <HeroComponent />
      <LanguageIconsComponent />
      <CreatorComponent />
      <TwoColumnLayout
        left={
          <>
          </>
        }
        right={
          <>
          </>
        }
      />
    </Layout>
  )
}

export default IndexPage
