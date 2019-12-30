import React from 'react';
import { Card } from 'antd';
import TestEditorLayout from 'components/layout/vertical/test-edit'
import TestEditBase from 'components/test/edit/base'

export default class TestEdit extends React.Component {
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
        e.returnValue = '問題を保存せずに閉じますか？';
    }

    render() {
        return (
            <TestEditorLayout>
                <Card
                    title="基本情報"
                    bordered={true}
                    style={{ maxWidth: '740px', width: '100%', margin: ' 20px auto', }}
                >
                    <TestEditBase />
                </Card>
            </TestEditorLayout>
        )
    }
}