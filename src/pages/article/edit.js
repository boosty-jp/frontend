import React from 'react';
import { Button, notification, Card, Divider } from 'antd';
import Editor from 'components/editor';
import ArticleEditLayout from 'components/layout/vertical/article-edit'
import ArticleEditHeader from 'components/article/editor-header'

export default class ArticleEditPage extends React.Component {
    state = {
        value: '',
    };

    handleChange = value => {
        this.setState({
            value,
        });
    };

    render() {
        return (
            <ArticleEditLayout>
                <div style={{ background: '#fff', padding: '24px' }}>
                    <ArticleEditHeader />
                    <div style={{ marginTop: '20px' }}>
                        <Editor handleChange={this.handleChange} />
                    </div>
                    {this.state.value}
                </div>
            </ArticleEditLayout>
        );
    }
}