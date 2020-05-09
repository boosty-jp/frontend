import React from "react"
import SEO from "components/seo/seo"
import Layout from "components/layout/horizontal"
import SalesComponent from 'components/account/sales'

const UserSalesPage = () => (
    <Layout>
        <SEO
            title="売上管理ページ"
            url="https://boosty.jp/accont/sales"
            description="boostyで販売した技術書に応じた売上管理を閲覧できます"
        />
        <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
            <SalesComponent />
        </div>
    </Layout>
)

export default UserSalesPage