import React from "react"
import { Divider, Tooltip, Badge } from 'antd';
import SimpleLogoImage from "components/image/logo/simple";
import { SearchOutlined, ReadOutlined, EditOutlined, UserOutlined, HeartOutlined, HomeOutlined, BellOutlined } from "@ant-design/icons";
import AccountDropdown from "components/menu/items/account-dropdown";
import { Link } from "gatsby";
import { isLoggedIn } from "services/local-user";

const appMenuStyle = {
    padding: '20px 4px 20px 4px',
    backgroundColor: '#002451',
    height: '100vh',
    color: '#bfbfbf',
    fontSize: '20px',
    textAlign: 'center',
    boxShadow: '2px 0 6px rgba(0,21,41,.35)',
}

const pages = [
    { key: "home", title: "ホーム", icon: <HomeOutlined />, link: "/home" },
    { key: "shelf", title: "本棚", icon: <ReadOutlined />, link: "/book/own" },
    { key: "like", title: "お気に入り", icon: <HeartOutlined />, link: "/like" },
    { key: "search", title: "検索", icon: <SearchOutlined />, link: "/search" },
]

const AccouontButtons = ({ activeKey }) => {
    if (!isLoggedIn()) {
        return (
            <Tooltip placement="right" title="ログイン">
                <Link to="/login" style={{ color: 'white' }}>
                    <UserOutlined />
                </Link>
            </Tooltip>
        )
    }
    return (
        <>
            <div style={{ margin: '10px auto' }}>
                <Tooltip placement="right" title="コンテンツ作成">
                    <Link to="/edit/list" style={{ color: activeKey === "edit" ? "white" : "#ccc" }}>
                        <Badge count={5} style={{ width: '20px', height: '14px', minWidth: '20px', lineHeight: '14px', padding: '0 3.5px', fontSize: '10px' }}>
                            <BellOutlined style={{ fontSize: '20px' }} />
                        </Badge>
                    </Link>
                </Tooltip>
            </div>
            <div style={{ margin: '10px auto' }}>
                <Tooltip placement="right" title="コンテンツ作成">
                    <Link to="/edit/list" style={{ color: activeKey === "edit" ? "white" : "#ccc" }}>
                        <EditOutlined />
                    </Link>
                </Tooltip>
            </div>
            <AccountDropdown placement="topRight" trigger={['click']} />
        </>
    )
}

const VerticalMenu = ({ activeKey }) => {
    return (
        <div style={{ ...appMenuStyle }}>
            <div style={{ margin: "0 auto" }}>
                <SimpleLogoImage style={{ margin: '0 auto' }} />
            </div>
            {pages.map(page => {
                const color = page.key === activeKey ? "white" : "#ccc";
                return (
                    <div style={{ marginTop: '20px', }} key={page.key}>
                        <Tooltip placement="right" title={page.title}>
                            <Link to={page.link} style={{ color: color }}>
                                {page.icon}
                            </Link>
                        </Tooltip>
                    </div>
                );
            })}
            <div style={{ position: 'fixed', bottom: '20px', left: '14px' }}>
                <Divider style={{ background: 'gray', margin: '8px 0px' }} />
                <AccouontButtons activeKey={activeKey} />
            </div>
        </div>
    )
}

export default VerticalMenu;