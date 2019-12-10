import React from "react"
import { Row, Col, Input } from 'antd';
import CoverImageUploader from 'components/article/cover-image-uploader'

const ArticleEditHeader = () => (
    <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8} lg={6} xl={6} style={{ textAlign: 'left' }}>
            <CoverImageUploader />
        </Col>
        <Col xs={24} sm={24} md={16} lg={18} xl={18}>
            <span style={{ fontWeight: '400', fontSize: '16px' }}>タイトル: </span>
            <Input size="large" placeholder="タイトルを入力してください" style={{ marginTop: '10px', marginBottom: '20px' }} />
            <span style={{ fontWeight: '400', fontSize: '16px' }}>ハッシュタグ: </span>
            <Input size="large" placeholder="タイトルを入力してください" style={{ marginTop: '10px' }} />
        </Col>
    </Row>
)

export default ArticleEditHeader