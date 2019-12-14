import React from 'react';
import { Icon, Button, notification, Card, Divider, Affix } from 'antd';
import { Row, Col } from 'antd';
import ArticleEditLayout from 'components/layout/vertical/article-edit'
import ArticleEditHeader from 'components/article/edit/header'
import MarkdownEditor from 'components/editor/markdown';
import Editor from 'components/editor/editor';

export default class ArticleEditPage extends React.Component {
    render() {
        return (
            <ArticleEditLayout>
                <Card
                    title="基本情報"
                    bordered={true}
                    style={{ maxWidth: '740px', width: '100%', margin: ' 20px auto', }}
                >
                    <ArticleEditHeader />
                </Card>
                <Card
                    title="内容"
                    bordered={true}
                    style={{ maxWidth: '740px', width: '100%', margin: ' 20px auto' }}
                >
                    <Editor />
                </Card>
                {/* <Row gutter={[24, 24]} style={{ padding: '24px' }}>
                    <Col xs={24} sm={24} md={24} lg={8} xl={8} style={{ textAlign: 'left' }}>
                        <Card title="基本情報" bordered={true} style={{ width: '100%' }}>
                            <ArticleEditHeader />
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                        <Card title="内容" bordered={true} style={{ width: '100%' }}>
                            <Editor />
                        </Card>
                    </Col>
                </Row> */}
            </ArticleEditLayout >
        );
    }
}