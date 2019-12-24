import React from "react"
import SEO from "components/seo"
import VerticalLayout from "components/layout/vertical/account"
import ProfileContents from "components/account/profile/view/content";
import UserProfileHeader from "components/user/profile-header";

const UserProfilePage = () => (
    <VerticalLayout pageTitle="プロフィール" selectedMenu="account-profile" openedMenu="account">
        <SEO title="Home" />
        <div style={{ margin: '0 auto 0 0' }}>
            <div style={{ background: 'white' }}>
                <div style={{ padding: '20px', maxWidth: '1250px' }}>
                    <UserProfileHeader selfSearch={true} />
                </div>
            </div>
            <div style={{ padding: '20px', maxWidth: '1250px' }}>
                <ProfileContents />
            </div>
        </div>
    </VerticalLayout>
)

export default UserProfilePage