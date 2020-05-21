import React from "react"
import Layout from "components/layout/horizontal"
import SEO from "components/seo/seo"
import { Typography, List } from "antd"
import { graphql, Link } from "gatsby";
import removeMd from 'remove-markdown'

const { Title } = Typography;

const NotificationPage = ({ data }) => {
    return (
        <Layout contentBackgroundColor="white">
            <SEO title="お知らせ" description="boostyに関するお知らせをご案内します。" />
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px 20px 80px 20px' }}>
                <Title level={2} style={{ textAlign: 'center' }}>お知らせ</Title>
                <div style={{ marginTop: '60px', boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)', borderRadius: '0.5rem', padding: '20px' }}>
                    <List
                        itemLayout="vertical"
                        dataSource={data.allContentfulNotification.edges}
                        renderItem={item => (
                            <List.Item key={item.node.slug}>
                                <List.Item.Meta
                                    title={<Link to={"/notification/" + item.node.slug}><Title level={4}>{item.node.title}</Title></Link>}
                                    description={item.node.updatedAt}
                                />
                                {removeMd(item.node.body.body).substr(0, 180)}
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </Layout>
    )
}

export const pageQuery = graphql`
  query AllNotifications {
    allContentfulNotification(sort: {fields: updatedAt, order: DESC}) {
      edges {
        node {
          title
          type
          slug
          body{
             body
          }
          updatedAt(locale: "ja-JP", formatString: "YYYY年MM月DD日")
        }
      }
    }
  }
`

export default NotificationPage