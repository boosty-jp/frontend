import React from "react"
import { Icon } from 'antd';
import { Link } from "gatsby";
import SignInForm from "components/auth/login/login-form"
import SimpleLayout from "components/layout/simple-layout";

const LoginPage = () => (
    <SimpleLayout maxWidth="450px" width="100%" height="400px" minHeight='400px'>
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
    </SimpleLayout>
)

export default LoginPage