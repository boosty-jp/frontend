import React from "react"
import { Menu } from 'antd';
import { Link } from 'gatsby'

const UserProfileMenu = () => {
    return (
        <Menu
            mode="horizontal"
            defaultSelectedKeys={"base"}
            style={{ width: '100%' }}
        >
            <Menu.Item key="base">
                <Link to="account/settings/base">コンテンツ</Link>
            </Menu.Item>
            <Menu.Item key="password">
                <Link to="account/settings/password">学習済み</Link>
            </Menu.Item>
            <Menu.Item key="mail">
                <Link to="account/settings/mail">いいね</Link>
            </Menu.Item>
        </Menu>
    );
}

export default UserProfileMenu;