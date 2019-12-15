import React from 'react';
import { Card } from 'antd';
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
            </ArticleEditLayout >
        );
    }
}