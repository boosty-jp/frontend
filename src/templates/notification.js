import * as React from "react"
import { Typography, Divider } from 'antd'
import NotificationLayout from "components/layout/notification-layout";
import MarkdownRender from 'utils/markdown/markdown-renderer'
import SEO from "components/seo/seo";

const { Title, Paragraph } = Typography;

const Component = ({ pageContext }) => {
    const notification = pageContext.notification;
    const notifications = pageContext.notifications;
    return (
        <NotificationLayout notifications={notifications} activePageSlug={notification.slug}>
            <SEO title={notification.title} />
            <Title level={1}>{notification.title}</Title>
            <Paragraph>{notification.updatedAt}</Paragraph>
            <Divider />
            <div className="book-page-body" dangerouslySetInnerHTML={{ __html: MarkdownRender.render(notification.body.body) }} />
        </NotificationLayout>
    )
}

export default Component