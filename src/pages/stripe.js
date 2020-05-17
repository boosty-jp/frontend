import React from "react"
import Layout from "components/layout/horizontal"
import withLocation from "components/wrapper/location";
import StripeCompleteComponent from 'components/account/sales/stripe-complete'
import NOSEO from "components/seo/noseo";

const StripePage = ({ search }) => {
    const { code, state } = search

    return (
        <Layout>
            <NOSEO title="売上振込先の登録" description="boostyでの売上を振込み先の情報を登録します。" />
            <div style={{ background: '#F7FAFF' }}>
                <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
                    <StripeCompleteComponent userId={state} code={code} />
                </div>
            </div>
        </Layout>
    )
}

export default withLocation(StripePage)