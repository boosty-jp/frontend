import React from "react"
import SEO from "components/seo"
import VerticalLayout from "components/layout/vertical/account"
import ContentLayout from "components/contents/viewer/layout";
import ManageArticles from "components/contents/viewer/manage-article";
import ManageCourse from "components/contents/viewer/manage-course";

const ContentsManagePage = () => (
    <VerticalLayout pageTitle="コンテンツ管理" selectedMenu="contents-manage" openedMenu="contents">
        <SEO title="Home" />
        <div style={{ padding: '10px' }}>
            <ContentLayout
                articleContents={<ManageArticles />}
                courseContents={<ManageCourse />}
            />
        </div>
    </VerticalLayout>
)

export default ContentsManagePage