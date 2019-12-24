import React from "react"
import PasswordForgetForm from 'components/auth/password-forget'
import SimpleLayout from "components/layout/simple-layout"

const ForgetPage = () => (
    <SimpleLayout maxWidth="400px" width="100%">
        <div style={{ margin: '0 auto', maxWidth: '400px', padding: '10px' }}>
            <div style={{ margin: '24px auto', padding: '20px', width: '100%', backgroundColor: 'white', borderRadius: '0.25rem' }}>
                <PasswordForgetForm />
            </div>
        </div>
    </SimpleLayout>
)

export default ForgetPage