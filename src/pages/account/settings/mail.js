import React from "react"
import SEO from "components/seo"
import Layout from "components/layout/horizontal"
import AccountEditLayout from 'components/account/settings/layout'
import MailUpdateForm from "components/account/settings/mail"

const AccountEditPage = () => (
    <Layout>
        <SEO title="Home" />
        <div style={{ backgroundColor: '#f0f5ff' }}>
            <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
                <AccountEditLayout page="mail">
                    <MailUpdateForm />
                </AccountEditLayout>
            </div>
        </div>
    </Layout>
)

export default AccountEditPage