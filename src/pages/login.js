import React from "react"
import { Link } from "gatsby";
import SEO from 'components/seo/seo'
import SignInForm from "components/auth/login/login-form"
import SimpleLayout from "components/layout/simple-layout";
import { QuestionCircleOutlined, UserOutlined } from "@ant-design/icons";

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    padding: '30px',
    margin: '20px',
    fontColor: 'black',
}

const LoginPage = () => (
    <SimpleLayout maxWidth="400px" width="100%" >
        <SEO title="ログイン" />
        <div style={{ ...cardStyle }}>
            <SignInForm />
        </div>
        <div style={{ margin: '24px auto', padding: '10px', textAlign: 'center' }}>
            <Link to="/forget">
                <p><QuestionCircleOutlined style={{ marginRight: '8px' }} />パスワードをお忘れの場合</p>
            </Link>
            <Link to="/signup">
                <p><UserOutlined style={{ marginRight: '8px' }} />アカウントをお持ちでない場合は、ご登録ください</p>
            </Link>
        </div>
    </SimpleLayout>
)

export default LoginPage