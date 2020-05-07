import React from "react"
import { message, Dropdown, Menu, Divider, notification } from 'antd';
import { Link } from "gatsby";
import { getUserImage, getCurrentUser, logout } from "services/local-user";
import getFirebase from "utils/firebase";
import AvatarImage from "components/avatar/image";
import { UserOutlined, SettingOutlined, MoneyCollectOutlined, LogoutOutlined, HistoryOutlined } from '@ant-design/icons'

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { };

const AccountDropdown = ({ placement = "bottomRight" }) => {
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
                <Link to="/account/profile"><UserOutlined style={{ marginRight: '8px' }} />プロフィール</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/account/settings/base"><SettingOutlined style={{ marginRight: '8px' }} />アカウント設定</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/account/history"><HistoryOutlined style={{ marginRight: '8px' }} />購入履歴</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/account/sales"><MoneyCollectOutlined style={{ marginRight: '8px' }} />売上管理</Link>
            </Menu.Item>
            <Divider style={{ margin: '6px 0px' }} />
            <Menu.Item
                onClick={() => {
                    const firebase = getFirebase();
                    firebase.auth().signOut().then(() => {
                        logout(() => {
                            navigate("/home");
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
                <LogoutOutlined style={{ marginRight: '8px' }} />ログアウト
        </Menu.Item>
        </Menu>
    );

    return (
        <>
            <Dropdown overlay={menu} placement={placement}>
                <span>
                    <AvatarImage imageUrl={avatarImage} displayName={userName} />
                </span>
            </Dropdown>
        </>
    )
}
export default AccountDropdown