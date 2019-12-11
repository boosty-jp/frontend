import React from 'react';
import { Typography } from 'antd';
import ArticleLayout from 'components/layout/vertical/article'

export default class ArticleDetailPage extends React.Component {
    render() {
        return (
            <ArticleLayout>
                <div style={{ background: '#fff', padding: '24px' }}>
                    <Typography>
                        <Typography.Title level={1}>記事のタイトル</Typography.Title>
                    </Typography>
                </div>
            </ArticleLayout>
        );
    }
}