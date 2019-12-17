import React from "react"

import Layout from "components/layout/horizontal"
import NOSEO from "components/seo/noseo"

import NOT_FOUND_IMAGE from 'images/404.png'
import { Typography } from "antd"

const NotFoundPage = () => (
  <Layout contentBackgroundColor="white">
    <NOSEO title="お探しのページが見つかりません" />
    <div style={{ backgroundColor: 'white', width: '100%' }}>
      <div style={{ maxWidth: "1250px", margin: 'auto', padding: '20px', position: 'relative', textAlign: 'center' }}>
        <Typography style={{ marginTop: '20px' }}>
          <Typography.Title>お探しのページが見つかりません</Typography.Title>
        </Typography>
        <img src={NOT_FOUND_IMAGE} style={{ margin: '30px auto 0px auto', maxWidth: '500px', height: 'auto', width: '90%' }} />
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
