import React from "react"
import { message, Button, Divider, Avatar, notification } from 'antd';
import { Link } from "gatsby";
import { getUserImage, getCurrentUser, logout } from "services/local-user";
import getFirebase from "utils/firebase";
const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { };


const LoginItems = () => {
    const avatarImage = getUserImage();

    return (
        <>
            {avatarImage ?
                <Avatar src={avatarImage} style={{ marginRight: '8px' }} />
                :
                <Avatar icon="user" style={{ marginRight: '8px' }} />
            }
            {getCurrentUser().userName}
            <Divider />
            <Link to="/signup">
                <p style={{ color: 'grey' }}>プロフィール</p>
            </Link>
            <Link to="/signup">
                <p style={{ color: 'grey' }}>コンテンツ管理</p>
            </Link>
            <Link to="/signup">
                <p style={{ color: 'grey' }}>学習中のコース</p>
            </Link>
            <Link to="/signup">
                <p style={{ color: 'grey' }}>お気に入り</p>
            </Link>
            <Divider />
            <Link to="/signup">
                <p style={{ color: 'grey' }}>コース一覧</p>
            </Link>
            <Link to="/signup">
                <p style={{ color: 'grey' }}>記事一覧</p>
            </Link>
            <Link to="/signup">
                <p style={{ color: 'grey' }}>カテゴリー</p>
            </Link>
            <Divider />
            <Button
                type="link"
                style={{ padding: '0px' }}
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
                }}>
                <p style={{ color: 'grey' }}>ログアウト</p>
            </Button>
        </>
    )
}

export default LoginItems