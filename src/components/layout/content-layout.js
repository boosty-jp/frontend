import React from "react"
import { Layout } from 'antd';
import PropTypes from "prop-types"
import GlobalMenu from 'components/menu/global'
import Footer from "../footer";

const { Content } = Layout;

const ContentLayout = ({ children, contentBackgroundColor }) => {

    var content = <Content >{children}</Content>
    if (contentBackgroundColor) content = <Content style={{ backgroundColor: contentBackgroundColor }}>{children}</Content>
    return (
        <Layout style={{ minHeight: '100vh', maxWidth: '100vw', background: '#F7FAFF', overflow: 'hidden' }}>
            <GlobalMenu />
            {content}
            <Footer />
        </Layout>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ContentLayout