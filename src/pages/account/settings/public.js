import React from "react"
import SEO from "components/seo"
import VerticalLayout from "components/layout/vertical/account"
import AccountEditLayout from 'components/account/settings/layout'
import UserPublicForm from "components/account/settings/public"

const AccountPublicEditPage = () => (
    <VerticalLayout pageTitle="公開設定" selectedMenu="account-settings" openedMenu="account">
        <SEO title="Home" />
        <AccountEditLayout page="public">
            <UserPublicForm />
        </AccountEditLayout>
    </VerticalLayout>
)

export default AccountPublicEditPage