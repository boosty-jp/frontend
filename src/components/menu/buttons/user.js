import React from "react"
import { Avatar, Dropdown, Menu, Divider, Icon } from 'antd';
import { Link } from "gatsby";

const menu = (
    <Menu>
        <div style={{ padding: '8px' }}>
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            Tomoki Yamashita
        </div>
        <Divider style={{ margin: '6px 0px' }} />
        <Menu.Item>
            <Link to="/"><Icon type="user" style={{ marginRight: '8px' }} />プロフィール</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="/"><Icon type="tool" style={{ marginRight: '8px' }} />コンテンツ管理</Link>
        </Menu.Item>
        <Divider style={{ margin: '6px 0px' }} />
        <Menu.Item>
            <Link to="/"><Icon type="read" style={{ marginRight: '8px' }} />学習中のコース</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="/"><Icon type="heart" style={{ marginRight: '8px' }} />お気に入り一覧</Link>
        </Menu.Item>
        <Divider style={{ margin: '6px 0px' }} />
        <Menu.Item>
            <Link to="/"><Icon type="logout" style={{ marginRight: '8px' }} />ログアウト</Link>
        </Menu.Item>
    </Menu>
);

const UserButtons = () => {
    return (
        <Dropdown overlay={menu} placement="bottomRight">
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </Dropdown>
    )
}
export default UserButtons