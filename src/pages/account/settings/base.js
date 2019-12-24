import React from "react"
import SEO from "components/seo"
import VerticalLayout from "components/layout/vertical/account"
import AccountEditLayout from 'components/account/settings/layout'
import ProfileBaseUpdateForm from 'components/account/settings/base'

const AccountEditPage = () => (
    <VerticalLayout pageTitle="アカウント設定" selectedMenu="account-settings" openedMenu="account">
        <SEO title="Home" />
        <AccountEditLayout page="base">
            <ProfileBaseUpdateForm />
        </AccountEditLayout>
    </VerticalLayout>
)

export default AccountEditPage