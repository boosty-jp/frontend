import React from "react"
import FirstBarItem from "components/lib/navigation/sidebar/first-bar-item";
import { SearchOutlined, ReadOutlined, HeartOutlined, HomeOutlined } from "@ant-design/icons";

const items = [
    { key: "home", title: "ホーム", icon: <HomeOutlined />, link: "/home" },
    { key: "shelf", title: "本棚", icon: <ReadOutlined />, link: "/book/own" },
    { key: "like", title: "お気に入り", icon: <HeartOutlined />, link: "/like" },
    { key: "search", title: "検索", icon: <SearchOutlined />, link: "/search" },
]

const GlobalUpperItems = ({ activeKey }) => {
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
                    isLower={false}
                />
            )
        })
    )
}

export default GlobalUpperItems