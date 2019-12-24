import React from "react"
import SignUpForm from "components/auth/signup/signup-form"
import { Icon } from 'antd';
import { Link } from "gatsby";
import SimpleLayout from "components/layout/simple-layout";

const SignUpPage = () => (
    <SimpleLayout maxWidth="400px" width="100%" >
        <div style={{ margin: '20px', padding: '30px', backgroundColor: 'white', borderRadius: '0.25rem' }}>
            <SignUpForm />
        </div>
        <div style={{ margin: '24px auto', padding: '10px', textAlign: 'center' }}>
            <Link to="/login">
                <p><Icon type="user" style={{ marginRight: '8px' }} />すでにアカウントをお持ちの場合は、ログインください</p>
            </Link>
        </div>
    </SimpleLayout>
)

export default SignUpPage