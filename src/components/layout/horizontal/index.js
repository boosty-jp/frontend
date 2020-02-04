import React from "react"
import PropTypes from "prop-types"
import { Layout } from 'antd';
import GlobalMenu from "components/menu/global";
import HorizontalFooter from "components/layout/horizontal/footer";
const { Content, Footer } = Layout;

const HorizontalLayout = ({ children, contentBackgroundColor }) => {
  var content = <Content style={{ backgroundColor: 'white' }}>{children}</Content>
  if (contentBackgroundColor) content = <Content style={{ backgroundColor: contentBackgroundColor }}>{children}</Content>
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <GlobalMenu />
      {content}
      <HorizontalFooter style={{ textAlign: 'center' }} />
    </Layout>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default HorizontalLayout