import React from 'react';
import { connect } from 'react-redux'
import SelectAnswerForm from 'components/test/edit/confirm/select-answer'
import { Button, Divider } from 'antd';
import TextAnswerForm from './text-answer';

class QuestionConfirmComponent extends React.Component {
    state = { answer: '' }

    updateAnswer = (answer) => {
        this.setState({ answer: answer });
    }

    render() {
        return (
            <>
                <p style={{ fontWeight: '500', fontSize: '20px', marginTop: '50px', marginBottom: '0px' }}>問題. </p>
                <div style={{ marginTop: '30px' }}>
                    {this.props.question}
                </div>
                <Divider />
                {this.props.type === 'select' && <SelectAnswerForm updateAnswer={this.updateAnswer} />}
                {this.props.type === 'text' && <TextAnswerForm updateAnswer={this.updateAnswer} text={this.state.answer} />}
                <Button type="primary">解答する</Button>
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

const QuestionConfirm = connect(mapStateToProps)(QuestionConfirmComponent)
export default QuestionConfirm