import React from "react"
import SEO from "components/seo"
import Layout from "components/layout/horizontal"
import AccountEditLayout from 'components/account/settings/layout'
import PasswordUpdateForm from "components/account/settings/password"

const AccountEditPage = () => (
    <Layout>
        <SEO title="Home" />
        <div style={{ background: 'white' }}>
            <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
                <AccountEditLayout page="password">
                    <PasswordUpdateForm />
                </AccountEditLayout>
            </div>
        </div>
    </Layout>
)

export default AccountEditPage