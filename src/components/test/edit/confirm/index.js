import React from 'react';
import { connect } from 'react-redux'
import { message } from 'antd';
import ExplanationConfirmForm from 'components/test/edit/confirm/explanation'
import QuestionConfirmForm from 'components/test/edit/confirm/question'

class QuestionConfirmComponent extends React.Component {
    state = { answered: false, ownAnswer: '', }

    updateAnswer = (ownAnswer) => {
        this.setState({ ownAnswer: ownAnswer });
    }

    submitAnswer = () => {
        if (!this.state.ownAnswer) {
            message.error('解答を入力してください')
            return;
        }
        this.setState({ answered: true });
    }

    reset = () => {
        this.setState({ answered: false, ownAnswer: '' });
    }

    render() {
        return (
            <>
                {this.state.answered ?
                    <ExplanationConfirmForm
                        reset={this.reset}
                        ownAnswer={this.state.ownAnswer}
                    />
                    :
                    <QuestionConfirmForm
                        ownAnswer={this.state.ownAnswer}
                        updateAnswer={this.updateAnswer}
                        submitAnswer={this.submitAnswer}
                    />
                }
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