import React from "react"
import AccountEditLayout from 'components/account/settings/layout'
import UserDeleteForm from "components/account/settings/delete"
import VerticalLayout from "components/layout/vertical"
import SEO from "components/seo/seo"

const AccountEditPage = () => (
    <VerticalLayout>
        <SEO
            title="アカウント削除"
            url="https://boosty.jp/accont/settings/delete"
            description="boostyのアカウント削除を行います。"
        />
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <AccountEditLayout page="delete">
                <UserDeleteForm />
            </AccountEditLayout>
        </div>
    </VerticalLayout>
)

export default AccountEditPage