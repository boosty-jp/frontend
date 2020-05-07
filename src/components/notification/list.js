import React from "react"

import { List } from 'antd';
import { useStaticQuery, graphql, Link } from "gatsby";
import { WarningTwoTone, ExclamationCircleTwoTone } from "@ant-design/icons";
import { createNotificationLink } from "utils/link-generator";

const boardStyle = {
  background: "white",
  borderRadius: "0.5rem",
  backgroundColor: 'white',
  boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
  borderColor: 'white',
  width: '100%',
  fontColor: 'black',
}

const NotificationIcon = ({ type, }) => {
  if (type === "emergency") {
    return <WarningTwoTone twoToneColor="#f5222d" style={{ marginRight: '4px' }} />
  } else if (type === "warning") {
    return <WarningTwoTone twoToneColor="#faad14" style={{ marginRight: '4px' }} />
  } else if (type === "topic") {
    return <ExclamationCircleTwoTone style={{ marginRight: '4px' }} />
  }
  return <></>
}

const NotificationList = () => {
  const data = useStaticQuery(graphql`
      query RecentArticles {
        allContentfulNotification(limit: 10, sort: {fields: updatedAt, order: DESC}) {
          edges {
            node {
              title
              type
              slug
              updatedAt(locale: "ja-JP", formatString: "YYYY年MM月DD日")
            }
          }
        }
      }
    `)

  return (
    <List
      header={<div>お知らせ</div>}
      bordered
      dataSource={data.allContentfulNotification.edges}
      style={boardStyle}
      renderItem={item => (
        <List.Item>
          <Link to={createNotificationLink(item.node.slug)}>
            <List.Item.Meta
              title={<><NotificationIcon type={item.node.type} /><span>{item.node.title}</span></>}
              description={item.node.updatedAt}
            />
          </Link>
        </List.Item>
      )}
    />
  )
}

export default NotificationList