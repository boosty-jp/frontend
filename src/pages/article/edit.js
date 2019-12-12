import React from 'react';
import { Button, notification, Card, Divider } from 'antd';
import ArticleEditLayout from 'components/layout/vertical/article-edit'
import ArticleEditHeader from 'components/article/edit/header'
import MarkdownEditor from 'components/editor/markdown';
import Editor from 'components/editor/editor';

export default class ArticleEditPage extends React.Component {
    render() {
        return (
            <ArticleEditLayout>
                <div style={{ background: '#fff', padding: '24px' }}>
                    <ArticleEditHeader />
                    <div style={{ marginTop: '20px' }}>
                        <Editor />
                    </div>
                </div>
            </ArticleEditLayout>
        );
    }
}