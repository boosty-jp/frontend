import React from "react"
import SEO from "components/seo"
import VerticalLayout from "components/layout/vertical"
import AccountEditLayout from 'components/user/settings/layout'
import MailUpdateForm from "components/user/settings/mail"

const AccountEditPage = () => (
    <VerticalLayout pageTitle="メールアドレス設定" selectedMenu="account-settings">
        <SEO title="Home" />
        <AccountEditLayout page="mail">
            <MailUpdateForm />
        </AccountEditLayout>
    </VerticalLayout>
)

export default AccountEditPage