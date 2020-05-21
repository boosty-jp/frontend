import React from "react"
import AccountEditLayout from 'components/account/settings/layout'
import ProfileBaseUpdateForm from 'components/account/settings/base'
import VerticalLayout from "components/layout/vertical"
import SEO from "components/seo/seo"

const AccountEditPage = () => (
    <VerticalLayout>
        <SEO
            title="アカウント編集"
            url="https://boosty.jp/accont/settings/base"
            description="boostyのアカウント基本情報を設定するページです。"
        />
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <AccountEditLayout page="base">
                <ProfileBaseUpdateForm />
            </AccountEditLayout>
        </div>
    </VerticalLayout>
)

export default AccountEditPage