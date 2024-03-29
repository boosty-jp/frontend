import React from "react"
import SEO from 'components/seo/seo'
import PasswordForgetForm from 'components/auth/password-forget'
import SimpleLayout from "components/layout/simple-layout"

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    padding: '30px',
    margin: '20px',
    fontColor: 'black',
}

const ForgetPage = () => (
    <SimpleLayout maxWidth="400px" width="100%">
        <SEO title="パスワードの再設定" description="boostyにログイン時のパスワードをお忘れの際に、確認メールを送信した後に再設定いただけます。" />
        <div style={{ margin: '0 auto', maxWidth: '400px', padding: '10px' }}>
            <div style={cardStyle}>
                <PasswordForgetForm />
            </div>
        </div>
    </SimpleLayout>
)

export default ForgetPage