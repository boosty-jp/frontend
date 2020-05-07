import React from "react"
import SEO from "components/seo"
import AccountEditLayout from 'components/account/settings/layout'
import ProfileBaseUpdateForm from 'components/account/settings/base'
import VerticalLayout from "components/layout/vertical"

const AccountEditPage = () => (
    <VerticalLayout>
        <SEO title="Home" />
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <AccountEditLayout page="base">
                <ProfileBaseUpdateForm />
            </AccountEditLayout>
        </div>
    </VerticalLayout>
)

export default AccountEditPage