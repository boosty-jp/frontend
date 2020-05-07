import React from "react"
import SEO from "components/seo"
import withLocation from "components/wrapper/location";
import VerticalLayout from "components/layout/vertical"
import OrderHistoryList from "components/account/history";

const AccountHistoryPage = () => {
    return (
        <VerticalLayout activeMenuKey="edit">
            <SEO title="Home" />
            <div style={{ backgroundColor: '#F7FAFF' }}>
                <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
                    <OrderHistoryList />
                </div>
            </div>
        </VerticalLayout>
    )
}

export default withLocation(AccountHistoryPage)