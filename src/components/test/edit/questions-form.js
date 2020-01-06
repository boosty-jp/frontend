import React from 'react';
import { connect } from 'react-redux'
import { Empty } from 'antd'
import AddQuestionDrawer from 'components/test/edit/add-question-drawer';
import QuestionList from 'components/test/edit/question-sort-list';

const QuestionsFormComponent = (props) => {
    return (
        <>
            {props.questions.length === 0 ?
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="問題を追加してください" />
                :
                <QuestionList />
            }
            <AddQuestionDrawer />
        </>
    );
}

const mapStateToProps = state => ({
    questions: state.testEditQuestions.questions,
})

const QuestionsForm = connect(mapStateToProps)(QuestionsFormComponent)
export default QuestionsForm