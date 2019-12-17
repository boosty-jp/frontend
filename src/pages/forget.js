import React from "react"
import PasswordForgetForm from 'components/auth/password-forget'
import SimpleLayout from "components/layout/simple-layout"

const ForgetPage = () => (
    <SimpleLayout maxWidth="500px" widht="100%" height="400px" minHeight="400px">
        <div style={{ margin: '0 auto', maxWidth: '600px', height: '400px' }}>
            <div style={{ margin: '20px', width: '100%', padding: '20px', backgroundColor: 'white', borderRadius: '0.25rem' }}>
                <PasswordForgetForm />
            </div>
        </div>
    </SimpleLayout>
)

export default ForgetPage