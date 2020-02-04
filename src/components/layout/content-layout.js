import React from "react"
import { Layout } from 'antd';
import PropTypes from "prop-types"
import GlobalMenu from 'components/menu/global'
import Footer from "../footer";
import Helmet from "react-helmet";

const { Content } = Layout;

const ContentLayout = ({ children, contentBackgroundColor }) => {

    var content = <Content >{children}</Content>
    if (contentBackgroundColor) content = <Content style={{ backgroundColor: contentBackgroundColor }}>{children}</Content>
    return (
        <Layout style={{ minHeight: '100vh', maxWidth: '100vw', backgroundColor: '#f0f5ff', overflow: 'hidden' }}>
            <Helmet>
                <link rel="preload" href='https://fonts.googleapis.com/css?family=Rubik:regular,bold,italic&subset=latin,latin-ext'></link>
            </Helmet>
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