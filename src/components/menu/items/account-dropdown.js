import React from "react"
import { message, Dropdown, Menu, Divider, Icon, notification, Button } from 'antd';
import { Link } from "gatsby";
import { getUserImage, getCurrentUser, logout } from "services/local-user";
import getFirebase from "utils/firebase";
import AvatarImage from "components/avatar/image";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { };

const AccountDropdown = () => {
    const avatarImage = getUserImage();
    const userName = getCurrentUser().userName;

    const menu = (
        <Menu>
            <div style={{ padding: '8px' }}>
                <AvatarImage imageUrl={avatarImage} displayName={userName} />
                <span style={{ marginLeft: '8px' }}>{userName}</span>
            </div>
            <Divider style={{ margin: '6px 0px' }} />
            <Menu.Item>
                <Link to="/account/profile"><Icon type="user" style={{ marginRight: '8px' }} />プロフィール</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/book/manage"><Icon type="edit" style={{ marginRight: '8px' }} />著書管理</Link>
            </Menu.Item>
            <Divider style={{ margin: '6px 0px' }} />
            <Menu.Item>
                <Link to="/account/settings/base"><Icon type="setting" style={{ marginRight: '8px' }} />アカウント設定</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/account/sales"><Icon type="money-collect" style={{ marginRight: '8px' }} />売上管理</Link>
            </Menu.Item>
            <Divider style={{ margin: '6px 0px' }} />
            <Menu.Item
                onClick={() => {
                    const firebase = getFirebase();
                    firebase.auth().signOut().then(() => {
                        logout(() => {
                            navigate("/");
                            message.info('ログアウトしました', 5);
                        });
                    }).catch(() => {
                        notification['error']({
                            message: 'エラーが発生しました',
                            description: 'お手数ですが、再度お試しください',
                        });
                    });
                }}
            >
                <Icon type="logout" style={{ marginRight: '8px' }} />ログアウト
        </Menu.Item>
        </Menu>
    );

    return (
        <>
            <Dropdown overlay={menu} placement="bottomRight">
                <span>
                    <AvatarImage imageUrl={avatarImage} displayName={userName} />
                </span>
            </Dropdown>
        </>
    )
}
export default AccountDropdown