import React from "react"
import SEO from "components/seo"
import Layout from "components/layout/horizontal"
import withLocation from "components/wrapper/location";
import StripeCompleteComponent from 'components/account/sales/stripe-complete'

const MailVerifyPage = ({ search }) => {
    const { code, state } = search

    return (
        <Layout>
            <SEO title="Home" />
            <div style={{ background: '#F7FAFF' }}>
                <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
                    <StripeCompleteComponent userId={state} code={code} />
                </div>
            </div>
        </Layout>
    )
}

export default withLocation(MailVerifyPage)