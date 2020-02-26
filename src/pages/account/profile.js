import React from "react"
import SEO from "components/seo"
import UserProfileHeader from "components/user/header";
import Layout from "components/layout/horizontal"
import PublishedBookList from "components/book/view/list/pulished-list";
import RecentViewedBookList from "components/book/view/list/recent-viiew-list";

const UserProfilePage = () => (
    <Layout>
        <SEO title="Home" />
        <div style={{ backgroundColor: '#f0f5ff' }}>
            <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
                <UserProfileHeader selfSearch={true} />
                <div style={{ marginTop: '30px' }}>
                    <RecentViewedBookList />
                </div>
                <div style={{ marginTop: '30px' }}>
                    <PublishedBookList />
                </div>
            </div>
        </div>
    </Layout>
)

export default UserProfilePage