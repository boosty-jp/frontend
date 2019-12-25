import React from "react"
import Layout from "../components/layout/horizontal"
import { Row, Col } from 'antd';
import SEO from "../components/seo"
import { Link } from "gatsby";

const PostPage = () => {
    return (
        <Layout>
            <SEO title="投稿ページ" />
            <div style={{ margin: '20px', padding: '20px' }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ textAlign: 'center' }}>
                        <Link to="/article/edit">
                            <div style={{ background: 'white', borderRadius: '0.5rem', minHeight: '200px' }}>
                                記事
                        </div>
                        </Link>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ textAlign: 'center' }}>
                        <Link to="/course/edit">
                            <div style={{ background: 'white', borderRadius: '0.5rem', minHeight: '200px' }}>
                                コース
                        </div>
                        </Link>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}

export default PostPage