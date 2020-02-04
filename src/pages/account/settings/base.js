import React from "react"
import SEO from "components/seo"
import Layout from "components/layout/horizontal"
import AccountEditLayout from 'components/account/settings/layout'
import ProfileBaseUpdateForm from 'components/account/settings/base'

const AccountEditPage = () => (
    <Layout>
        <SEO title="Home" />
        <div style={{ background: 'white' }}>
            <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
                <AccountEditLayout page="base">
                    <ProfileBaseUpdateForm />
                </AccountEditLayout>
            </div>
        </div>
    </Layout>
)

export default AccountEditPage