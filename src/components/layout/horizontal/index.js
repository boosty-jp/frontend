import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Layout } from 'antd';
import HorizontalMenu from "components/menu/horizontal";
import HorizontalFooter from "components/layout/horizontal/footer";
const { Content, Footer } = Layout;

const HorizontalLayout = ({ children, contentBackgroundColor }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  var content = <Content >{children}</Content>
  if (contentBackgroundColor) content = <Content style={{ backgroundColor: contentBackgroundColor }}>{children}</Content>
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HorizontalMenu />
      {content}
      <HorizontalFooter style={{ textAlign: 'center' }} />
    </Layout>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default HorizontalLayout