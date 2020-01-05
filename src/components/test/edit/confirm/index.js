import React from 'react';
import { connect } from 'react-redux'
import { updateTitle, updateType } from 'modules/test/edit/question'
import { Typography } from 'antd';

const QuestionConfirmComponent = (props) => {
    return (
        <>
            <p>{props.title}</p>
            <div>
                {question}
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    title: state.testEditQuestion.title,
    question: state.testEditQuestion.questionText,
    type: state.testEditQuestion.type,
    answers: state.testEditQuestion.answers,
    explanations: state.testEditQuestion.explanations,
})

const QuestionConfirm = connect(mapStateToProps)(QuestionConfirmComponent)
export default QuestionConfirm