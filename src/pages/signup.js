import React from "react"
import SEO from 'components/seo/seo'
import SignUpForm from "components/auth/signup/signup-form"
import { Link } from "gatsby";
import SimpleLayout from "components/layout/simple-layout";
import { UserOutlined } from "@ant-design/icons";

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    padding: '30px',
    margin: '20px',
    fontColor: 'black',
}

const SignUpPage = () => (
    <SimpleLayout maxWidth="400px" width="100%" >
        <SEO title="会員登録" description="boostyでのユーザー登録を行います。" />
        <div style={cardStyle}>
            <SignUpForm />
        </div>
        <div style={{ margin: '24px auto', padding: '10px', textAlign: 'center' }}>
            <Link to="/login">
                <p><UserOutlined style={{ marginRight: '8px' }} />すでにアカウントをお持ちの場合は、ログインください</p>
            </Link>
        </div>
    </SimpleLayout>
)

export default SignUpPage