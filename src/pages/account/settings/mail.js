import React from "react"
import SEO from "components/seo"
import VerticalLayout from "components/layout/vertical/account"
import AccountEditLayout from 'components/account/settings/layout'
import MailUpdateForm from "components/account/settings/mail"

const AccountEditPage = () => (
    <VerticalLayout pageTitle="メールアドレス設定" selectedMenu="account-settings" openedMenu="account">
        <SEO title="Home" />
        <AccountEditLayout page="mail">
            <MailUpdateForm />
        </AccountEditLayout>
    </VerticalLayout>
)

export default AccountEditPage