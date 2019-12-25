import React from "react"
import { message, Avatar, Dropdown, Menu, Divider, Icon, notification, Button } from 'antd';
import { Link } from "gatsby";
import { getUserImage, getCurrentUser, logout } from "services/local-user";
import getFirebase from "utils/firebase";
import AvatarImage from "components/avatar/image";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { };

const UserButtons = () => {
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
                <Link to="/account/contents/manage"><Icon type="tool" style={{ marginRight: '8px' }} />コンテンツ管理</Link>
            </Menu.Item>
            <Divider style={{ margin: '6px 0px' }} />
            <Menu.Item>
                <Link to="/"><Icon type="read" style={{ marginRight: '8px' }} />学習中のコース</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/"><Icon type="heart" style={{ marginRight: '8px' }} />お気に入り一覧</Link>
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
            <Button icon="edit" type="primary" style={{ marginRight: '12px' }} onClick={() => navigate('/post')}>投稿</Button>
            <Dropdown overlay={menu} placement="bottomRight">
                <span>
                    <AvatarImage imageUrl={avatarImage} displayName={userName} />
                </span>
            </Dropdown>
        </>
    )
}
export default UserButtons