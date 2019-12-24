import React from "react"
import { Layout } from 'antd'
import VerticalFooter from 'components/layout/vertical/footer'
import LargeLogo from "components/logo/large"
const { Content } = Layout;

const backgroundStyle = {
    width: '100vw',
    paddingTop: '60px',
    backgroundSize: '100%',
    backgroundColor: '#f0f2f5',
}

const SimpleLayout = ({ children, maxWidth, width, height, minHeight }) => (
    <Layout style={{ minHeight: '100vh' }}>
        <Content>
            <div style={backgroundStyle}>
                <div style={{ maxWidth: maxWidth, width: width, height: height, minHeight: minHeight, margin: '0 auto' }}>
                    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                        <LargeLogo />
                    </div>
                    {children}
                </div>
            </div>
        </Content>
        <div style={{ marginTop: '10px' }}>
            <VerticalFooter />
        </div>
    </Layout>
)

export default SimpleLayout