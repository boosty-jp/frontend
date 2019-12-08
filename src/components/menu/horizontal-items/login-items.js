import React from "react"
import { Divider, Avatar } from 'antd';
import { Link } from "gatsby";

const LoginItems = () => (
    <>
        <Link to="/">
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{ marginRight: '8px' }} />
            Tomoki Yamashita
        </Link>
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
        <Link to="/signup">
            <p style={{ color: 'grey' }}>ログアウト</p>
        </Link>
    </>
)

export default LoginItems