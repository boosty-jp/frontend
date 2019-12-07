import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Layout } from 'antd';
import HorizontalMenu from "../menu/horizontal";
const { Content, Footer } = Layout;

const HorizontalLayout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Layout >
      <HorizontalMenu />
      <Content >
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2019 Created by Ant UED</Footer>
    </Layout>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default HorizontalLayout