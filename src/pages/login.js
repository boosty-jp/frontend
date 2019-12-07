import React from "react"
import SignInForm from "components/auth/form"
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

const LoginPage = () => (
    <div style={backgroundStyle}>
        <div style={{ margin: '0 auto', width: '400px', height: '400px' }}>
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                <LargeLogo />
            </div>
            <div style={{ margin: '20px', padding: '30px', backgroundColor: 'white', borderRadius: '0.25rem' }}>
                <SignInForm />
            </div>
            <div style={{ margin: '24px auto', textAlign: 'center' }}>
                <Link to="/forget">
                    <p><Icon type="question-circle" style={{ marginRight: '8px' }} />パスワードをお忘れの場合</p>
                </Link>
                <Link to="/signup">
                    <p><Icon type="user" style={{ marginRight: '8px' }} />アカウントをお持ちでない場合は、ご登録ください</p>
                </Link>
            </div>
        </div>
    </div >
)

export default LoginPage