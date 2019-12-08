import React from "react"
import SignUpForm from "components/auth/signup-form"
import LargeLogo from "components/logo/large"
import { Icon } from 'antd';
import { Link } from "gatsby";

const backgroundStyle = {
    width: '100vw',
    height: '100vh',
    paddingTop: '100px',
    backgroundSize: '100%',
    backgroundColor: '#f0f2f5',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 110px',
    backgroundImage: `url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg')`,
}

const SignUpPage = () => (
    <div style={backgroundStyle}>
        <div style={{ margin: '0 auto', width: '400px', height: '400px' }}>
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                <LargeLogo />
            </div>
            <div style={{ margin: '20px', padding: '30px', backgroundColor: 'white', borderRadius: '0.25rem' }}>
                <SignUpForm />
            </div>
            <div style={{ margin: '24px auto', textAlign: 'center' }}>
                <Link to="/login">
                    <p><Icon type="user" style={{ marginRight: '8px' }} />すでにアカウントをお持ちの場合は、ログインください</p>
                </Link>
            </div>
        </div>
    </div >
)

export default SignUpPage