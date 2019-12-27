import React from 'react';
import { Card } from 'antd';
import ArticleEditLayout from 'components/layout/vertical/article-edit'
import ArticleEditHeader from 'components/article/edit/header'
import Editor from 'components/editor';

export default class ArticleEdit extends React.Component {
    constructor(props) {
        super(props);
        this.handleBeforeUnload = this.handleBeforeUnload.bind(this);
    }

    componentWillMount() {
        window.addEventListener('beforeunload', this.handleBeforeUnload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }

    handleBeforeUnload(e) {
        e.preventDefault();
        e.returnValue = '記事を保存せずに閉じますか？';
    }

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
        )
    }
}