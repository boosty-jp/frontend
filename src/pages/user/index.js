import React from "react"
import Layout from "components/layout/horizontal"
import UserProfileHeader from "components/user/profile-header";
import UserProfileMenu from "components/user/profile-menu";
import UserCreatedCourse from "components/user/contents";
import UserCreatedArticles from "components/user/articles";

const UserPage = () => {
    return (
        <Layout>
            <div style={{ backgroundColor: 'white', padding: '20px 20px 0px 20px', maxWidth: '1250px', margin: '20px auto' }}>
                <UserProfileHeader />
                <UserProfileMenu />
            </div>
            <div style={{ padding: '10px 0px 20px 0px', maxWidth: '1250px', margin: '0 auto' }}>
                <UserCreatedCourse />
                <UserCreatedArticles />
            </div>
        </Layout>
    );
}

export default UserPage;