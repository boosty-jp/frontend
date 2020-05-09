import React from "react"
import AccountEditLayout from 'components/account/settings/layout'
import PasswordUpdateForm from "components/account/settings/password"
import VerticalLayout from "components/layout/vertical"
import SEO from "components/seo/seo"

const AccountEditPage = () => (
    <VerticalLayout>
        <SEO
            title="パスワード変更"
            url="https://boosty.jp/accont/settings/password"
            description="boostyで利用するパスワードを変更する"
        />
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <AccountEditLayout page="password">
                <PasswordUpdateForm />
            </AccountEditLayout>
        </div>
    </VerticalLayout>
)

export default AccountEditPage