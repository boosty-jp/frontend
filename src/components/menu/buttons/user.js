import React from "react"
import { message, Avatar, Dropdown, Menu, Divider, Icon, notification } from 'antd';
import { Link } from "gatsby";
import { getUserImage, getCurrentUser, logout } from "services/local-user";
import getFirebase from "utils/firebase";
const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { };



const UserButtons = () => {
    const avatarImage = getUserImage();
    const userName = getCurrentUser().userName;

    const menu = (
        <Menu>
            <div style={{ padding: '8px' }}>
                {avatarImage ?
                    <Avatar src={avatarImage} style={{ marginRight: '8px' }} />
                    :
                    <Avatar icon="user" style={{ marginRight: '8px' }} />
                }
                {userName}
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
        <Dropdown overlay={menu} placement="bottomRight">
            {avatarImage ?
                <Avatar src={avatarImage} />
                :
                <Avatar icon="user" />
            }
        </Dropdown>
    )
}
export default UserButtons