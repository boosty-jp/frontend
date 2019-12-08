import React from "react"
import { Button } from 'antd';

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { };

const GuestButtons = () => {
    return (
        <>
            <Button style={{ marginRight: '8px' }} onClick={() => navigate('/login')}>ログイン</Button>
            <Button type="primary" onClick={() => navigate('/signup')}>会員登録</Button>
        </>
    )
}
export default GuestButtons