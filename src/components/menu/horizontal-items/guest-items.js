import React from "react"
import { Divider, Icon } from 'antd';
import { Link } from "gatsby";

const GuestItems = () => (
  <>
    <Link to="/login">
      <p><Icon type="login" style={{ marginRight: '8px' }} />ログインする</p>
    </Link>
    <Link to="/signup">
      <p><Icon type="user" style={{ marginRight: '8px' }} />会員登録する</p>
    </Link>
    <Divider>
      <span style={{ fontSize: '12px' }}>コンテンツ</span>
    </Divider>
    <Link to="/signup">
      <p style={{ color: 'grey' }}>コース一覧</p>
    </Link>
    <Link to="/signup">
      <p style={{ color: 'grey' }}>記事一覧</p>
    </Link>
    <Link to="/signup">
      <p style={{ color: 'grey' }}>カテゴリー</p>
    </Link>
    <Divider>
      <span style={{ fontSize: '12px' }}>運営会社</span>
    </Divider>
    <Link to="/signup">
      <p style={{ color: 'grey' }}>会社概要</p>
    </Link>
    <Link to="/signup">
      <p style={{ color: 'grey' }}>お問い合わせ</p>
    </Link>
    <Divider>
      <span style={{ fontSize: '12px' }}>ヘルプ</span>
    </Divider>
    <Link to="/signup">
      <p style={{ color: 'grey' }}>利用規約</p>
    </Link>
    <Link to="/signup">
      <p style={{ color: 'grey' }}>プライバシーポリシー</p>
    </Link>
  </>
)

export default GuestItems