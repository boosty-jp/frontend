import React from "react"

import Layout from "../components/layout/horizontal"
import SEO from "../components/seo"
import TopEyecatch from "components/eyecatch/top"
import TwoColumnLayout from "components/layout/two-column"
import LearningCurriculums from "components/curriculum/learnings"
import TopicCategoryCard from "components/category/topic-card"
import TopicNotificationCard from "components/notification/topic-card"
import TopicCurriculums from "components/curriculum/topics"
import TopicArticles from "components/article/topics"

const learnings = [
  { id: 1, title: 'HTMLの基礎', image: 'https://www.logolynx.com/images/logolynx/ff/ff1a8f176abee68c19015dd9ca472bf2.png', progress: 32, LastLearnedDate: '2分前' },
  { id: 1, title: 'HTMLの基礎', image: 'https://www.logolynx.com/images/logolynx/ff/ff1a8f176abee68c19015dd9ca472bf2.png', progress: 32, LastLearnedDate: '2分前' },
  { id: 1, title: 'HTMLの基礎', image: 'https://www.logolynx.com/images/logolynx/ff/ff1a8f176abee68c19015dd9ca472bf2.png', progress: 32, LastLearnedDate: '2分前' },
  { id: 1, title: 'HTMLの基礎', image: 'https://www.logolynx.com/images/logolynx/ff/ff1a8f176abee68c19015dd9ca472bf2.png', progress: 32, LastLearnedDate: '2分前' },
  { id: 1, title: 'HTMLの基礎', image: 'https://www.logolynx.com/images/logolynx/ff/ff1a8f176abee68c19015dd9ca472bf2.png', progress: 32, LastLearnedDate: '2分前' },
  { id: 1, title: 'HTMLの基礎', image: 'https://www.logolynx.com/images/logolynx/ff/ff1a8f176abee68c19015dd9ca472bf2.png', progress: 32, LastLearnedDate: '2分前' },
]

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <TopEyecatch />
    <TwoColumnLayout
      left={
        <>
          <LearningCurriculums learnings={learnings} />
          <TopicCurriculums />
          <TopicArticles />
        </>
      }
      right={
        <>
          <TopicCategoryCard />
          <TopicNotificationCard />
        </>
      }
    />
  </Layout>
)

export default IndexPage
