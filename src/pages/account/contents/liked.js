import React from "react"
import SEO from "components/seo"
import VerticalLayout from "components/layout/vertical-account"
import ContentLayout from "components/contents/viewer/layout";
import LikedArticles from "components/contents/viewer/liked-article";
import LikedCourse from "components/contents/viewer/liked-course";

const LikedPage = () => (
    <VerticalLayout pageTitle="お気に入り" selectedMenu="contents-liked" openedMenu="contents">
        <SEO title="Home" />
        <div style={{ padding: '10px' }}>
            <ContentLayout
                articleContents={<LikedArticles />}
                courseContents={<LikedCourse />}
            />
        </div>
    </VerticalLayout>
)

export default LikedPage