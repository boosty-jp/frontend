import React from "react"
import SEO from "components/seo"
import VerticalLayout from "components/layout/vertical"
import ProfileHeader from "components/user/profile/view/header";
import ProfileContents from "components/user/profile/view/content";

const IndexPage = () => (
    <VerticalLayout pageTitle="プロフィール">
        <SEO title="Home" />
        <div style={{ background: '#fff' }}>
            <ProfileHeader />
        </div>
        <div style={{ padding: '20px' }}>
            <ProfileContents />
        </div>
    </VerticalLayout>
)

export default IndexPage
