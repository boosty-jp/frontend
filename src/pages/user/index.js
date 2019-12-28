import React from "react"
import withLocation from "components/wrapper/location";
import Layout from "components/layout/horizontal"
import UserProfileHeader from "components/user/profile-header";
import UserProfileMenu from "components/user/profile-menu";
import UserCreatedCourse from "components/user/contents";
import UserCreatedArticles from "components/user/articles";

const UserPage = ({ search }) => {
    const { id } = search;
    return (
        <Layout>
            <div style={{ backgroundColor: 'white', padding: '20px 20px 0px 20px', maxWidth: '1250px', margin: '20px auto' }}>
                <UserProfileHeader id={id} />
                <UserProfileMenu />
            </div>
            <div style={{ padding: '10px 0px 20px 0px', maxWidth: '1250px', margin: '0 auto' }}>
                <UserCreatedCourse />
                <UserCreatedArticles />
            </div>
        </Layout>
    );
}

export default withLocation(UserPage)