import React from "react"
import SEO from "components/seo"
import VerticalLayout from "components/layout/vertical/account"
import AccountEditLayout from 'components/account/settings/layout'
import UserDeleteForm from "components/account/settings/delete"

const AccountDeletePage = () => (
    <VerticalLayout pageTitle="アカウント削除" selectedMenu="account-settings" openedMenu="account">
        <SEO title="Home" />
        <AccountEditLayout page="delete">
            <UserDeleteForm />
        </AccountEditLayout>
    </VerticalLayout>
)

export default AccountDeletePage