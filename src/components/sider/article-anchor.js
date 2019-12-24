import React from "react"
import { Row, Col, Anchor } from 'antd';
const { Link } = Anchor;

const ArticleAnchor = () => (
    <div style={{ position: "fixed", right: '0px', textAlign: 'left', height: '0px', padding: '20px', width: 'calc((100% - 740px) / 2)' }}>
        <Anchor style={{ backgroundColor: 'transparent' }}>
            <Link href="#Editor.js" title="Editor.js" />
            <Link href="#Key features" title="Key features" />
            <Link href="#components-anchor-demo-basic" title="Basic demo with Target" target="_blank" />
            <Link href="#API" title="API">
                <Link href="#Anchor-Props" title="Anchor Props" />
                <Link href="#Link-Props" title="Link Props" />
            </Link>
        </Anchor>
    </div>
)

const ArticleAnchorMenu = ({ onCourse }) => {
    return (
        <Row >
            {onCourse ?
                <Col xs={0} sm={0} md={0} lg={0} xl={24} xxl={24}>
                    <ArticleAnchor />
                </Col>
                :
                <Col xs={0} sm={0} md={0} lg={24} xl={24} xxl={24}>
                    <ArticleAnchor />
                </Col>
            }
        </Row>
    )
}

export default ArticleAnchorMenu