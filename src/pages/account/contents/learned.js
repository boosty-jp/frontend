import React from "react"
import SEO from "components/seo"
import VerticalLayout from "components/layout/vertical"
import ContentLayout from "components/contents/viewer/layout";
import LearnedArticles from "components/contents/viewer/learned-article";
import LearnedCourse from "components/contents/viewer/learned-course";

const LikedPage = () => (
    <VerticalLayout pageTitle="学習済み" selectedMenu="learned">
        <SEO title="Home" />
        <div style={{ padding: '10px' }}>
            <ContentLayout
                articleContents={<LearnedArticles />}
                courseContents={<LearnedCourse />}
            />
        </div>
    </VerticalLayout>
)

export default LikedPage