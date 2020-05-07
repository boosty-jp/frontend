import React from "react"
import SEO from "components/seo"
import Layout from "components/layout/horizontal"
import SalesComponent from 'components/account/sales'

const UserSalesPage = () => (
    <Layout>
        <SEO title="Home" />
        <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
            <SalesComponent />
        </div>
    </Layout>
)

export default UserSalesPage