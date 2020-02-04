import React from "react"
import { Button } from 'antd';
import SimpleShadowButton from "components/button/simple-shadow";
import { Link } from "gatsby";

const GuestButtons = () => {
    return (
        <>
            <Link to="/login" style={{ marginRight: '16px' }}>
                <Button type="link" >ログイン</Button>
            </Link>
            <Link to="/signup">
                <SimpleShadowButton text="会員登録" color="#1890ff" />
            </Link>
        </>
    )
}

export default GuestButtons