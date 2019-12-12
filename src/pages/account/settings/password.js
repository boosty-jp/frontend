import React from "react"
import SEO from "components/seo"
import VerticalLayout from "components/layout/vertical/account"
import AccountEditLayout from 'components/user/settings/layout'
import PasswordUpdateForm from "components/user/settings/password"

const AccountEditPage = () => (
    <VerticalLayout pageTitle="パスワード設定" selectedMenu="account-settings" openedMenu="account">
        <SEO title="Home" />
        <AccountEditLayout page="password">
            <PasswordUpdateForm />
        </AccountEditLayout>
    </VerticalLayout>
)

export default AccountEditPage