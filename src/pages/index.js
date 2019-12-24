import React from "react"
import Layout from "../components/layout/horizontal"
import { message } from 'antd';
import SEO from "../components/seo"
import TopEyecatch from "components/eyecatch/top"
import TwoColumnLayout from "components/layout/two-column"
import LearningCurriculums from "components/course/learnings-partial"
import TopicCategoryCard from "components/category/topic-card"
import TopicNotificationCard from "components/notification/topic-card"
import TopicCurriculums from "components/course/topics"
import TopicArticles from "components/article/topics"
import TopicCategoryList from "components/category/topic-list"
import TopicUserCard from "components/account/topic-card"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <TopEyecatch />
      <TwoColumnLayout
        left={
          <>
            <TopicCategoryList />
            <LearningCurriculums />
            <TopicCurriculums />
            <TopicArticles />
          </>
        }
        right={
          <>
            <TopicCategoryCard />
            <TopicNotificationCard />
            <TopicUserCard />
          </>
        }
      />
    </Layout>
  )
}

export default IndexPage
