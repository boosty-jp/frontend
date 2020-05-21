import React from "react"
import AccountEditLayout from 'components/account/settings/layout'
import MailUpdateForm from "components/account/settings/mail"
import VerticalLayout from "components/layout/vertical"
import SEO from "components/seo/seo"

const AccountEditPage = () => (
    <VerticalLayout>
        <SEO
            title="メール変更"
            url="https://boosty.jp/accont/settings/mail"
            description="boostyで利用するメールを変更する"
        />
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <AccountEditLayout page="mail">
                <MailUpdateForm />
            </AccountEditLayout>
        </div>
    </VerticalLayout>
)

export default AccountEditPage