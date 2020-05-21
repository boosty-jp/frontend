import React from "react"
import Layout from "components/layout/horizontal"
import NOSEO from "components/seo/noseo"
import { Typography, Button } from "antd"
import NotFoundImage from "components/image/404"
import { Link } from 'gatsby'

const NotFoundPage = () => (
  <Layout contentBackgroundColor="white">
    <NOSEO title="お探しのページが見つかりません" />
    <div style={{ backgroundColor: 'white', width: '100%' }}>
      <div style={{ maxWidth: "1250px", margin: 'auto', padding: '20px', position: 'relative', textAlign: 'center' }}>
        <Typography style={{ marginTop: '20px' }}>
          <Typography.Title>お探しのページが見つかりません</Typography.Title>
        </Typography>
        <div style={{ margin: '0px auto', padding: '20px', maxWidth: '400px' }}>
          <NotFoundImage />
        </div>
        <Link to="/home" style={{ marginTop: '40px', textAlign: 'center' }}>
          <Button type="primary">ホームへ</Button>
        </Link>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
