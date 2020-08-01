import React from "react"
import { Badge } from "antd"
import FirstBarItem from "components/lib/navigation/sidebar/first-bar-item";
import { HighlightOutlined, NotificationOutlined } from "@ant-design/icons";
import { isLoggedIn } from "services/local-user";
import style from "styles/lib/navigation/sidebar/first-bar-item.mod.scss";

const items = [
    {
        key: "notifications",
        title: "お知らせ",
        icon: <Badge dot><NotificationOutlined className={style.iconSize} /></Badge>,
        link: "/notifications"
    },
    {
        key: "edit",
        title: "執筆",
        icon: <HighlightOutlined />,
        link: "/edit/list"
    },
]

const GlobalLowerItems = ({ activeKey }) => {
    if (!isLoggedIn()) return <></>

    return (
        items.map(item => {
            const isActive = activeKey === item.key;
            return (
                <FirstBarItem
                    key={item.key}
                    title={item.title}
                    icon={item.icon}
                    link={item.link}
                    isActive={isActive}
                    isLower={true}
                />
            )
        })
    )
}

export default GlobalLowerItems