import React from 'react';
import { connect } from 'react-redux'
import { Empty } from 'antd'
import AddQuestionDrawer from 'components/test/edit/add-question-drawer';

const QuestionsFormComponent = (props) => {
    return (
        <>
            {props.questions.length === 0 ?
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="問題を追加してください" />
                :
                // <SectionSortList sections={props.questions} />
                <></>
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