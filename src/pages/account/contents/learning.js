import React from "react"
import SEO from "components/seo"
import VerticalLayout from "components/layout/vertical/account"
import LearningAllCourses from "components/course/learning-all";

const LearningPage = () => (
    <VerticalLayout pageTitle="学習中のコース" selectedMenu="learning" openedMenu="study">
        <SEO title="Home" />
        <div style={{ padding: '10px' }}>
            <LearningAllCourses />
        </div>
    </VerticalLayout>
)

export default LearningPage