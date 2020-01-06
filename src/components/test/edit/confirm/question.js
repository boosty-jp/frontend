import React from 'react';
import { connect } from 'react-redux'
import SelectAnswerForm from 'components/test/edit/confirm/select-answer'
import { Button, Divider } from 'antd';
import TextAnswerForm from './text-answer';

class QuestionConfirmFormComponent extends React.Component {
    render() {
        return (
            <>
                <p style={{ fontWeight: '500', fontSize: '20px', marginTop: '50px', marginBottom: '0px' }}>問題. </p>
                <div style={{ marginTop: '30px' }}>
                    {this.props.question}
                </div>
                <Divider />
                {this.props.type === 'select' && <SelectAnswerForm updateAnswer={this.props.updateAnswer} />}
                {this.props.type === 'text' && <TextAnswerForm updateAnswer={this.props.updateAnswer} text={this.props.ownAnswer} />}
                <Button type="primary" onClick={this.props.submitAnswer}>解答する</Button>
                <div style={{ height: '50px' }}></div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    question: state.testEditQuestion.questionText,
    type: state.testEditQuestion.type,
    answers: state.testEditQuestion.answers,
    explanations: state.testEditQuestion.explanations,
})

const QuestionConfirmForm = connect(mapStateToProps)(QuestionConfirmFormComponent)
export default QuestionConfirmForm