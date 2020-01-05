import React from 'react';
import { connect } from 'react-redux'
import { Card, Tooltip, Icon } from 'antd';
import TestEditorLayout from 'components/layout/vertical/test-edit'
import TestEditBase from 'components/test/edit/base'
import QuestionsForm from 'components/test/edit/questions-form'

class TestEditComponent extends React.Component {
    constructor(props) {
        super(props);
        // this.handleBeforeUnload = this.handleBeforeUnload.bind(this);
    }

    // componentWillMount() {
    //     window.addEventListener('beforeunload', this.handleBeforeUnload);
    // }

    // componentWillUnmount() {
    //     window.removeEventListener('beforeunload', this.handleBeforeUnload);
    // }

    // handleBeforeUnload(e) {
    //     e.preventDefault();
    //     e.returnValue = '問題を保存せずに閉じますか？';
    // }

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
                <Card
                    title="問題一覧"
                    bordered={true}
                    style={{ maxWidth: '740px', width: '100%', margin: ' 20px auto' }}
                    extra={
                        <>
                            <span style={{ marginRight: '8px' }}>{this.props.questionCount} / 20</span>
                            <Tooltip title="20問まで作成できます">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </>
                    }
                >
                    <QuestionsForm />
                </Card>
            </TestEditorLayout>
        )
    }
}

const mapStateToProps = state => ({
    questionCount: state.testEditQuestions.questions.length,
})

const TestEdit = connect(mapStateToProps)(TestEditComponent)
export default TestEdit