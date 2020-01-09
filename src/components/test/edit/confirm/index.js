import React from 'react';
import { message } from 'antd';
import ExplanationConfirmForm from 'components/test/edit/confirm/explanation'
import QuestionConfirmForm from 'components/test/edit/confirm/question'

export default class QuestionConfirm extends React.Component {
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

    componentDidUpdate(prevProps) {
        // 問題番号が変わったら初期化する
        if (this.props.questionIdx !== prevProps.questionIdx) {
            this.setState({ answered: false, ownAnswer: '' });
        }
    }

    render() {
        return (
            <>
                {this.state.answered ?
                    <ExplanationConfirmForm
                        reset={this.reset}
                        ownAnswer={this.state.ownAnswer}
                        type={this.props.type}
                        selectAnswer={this.props.selectAnswer}
                        textAnswer={this.props.textAnswer}
                        explanations={this.props.explanations}
                    />
                    :
                    <QuestionConfirmForm
                        ownAnswer={this.state.ownAnswer}
                        updateAnswer={this.updateAnswer}
                        submitAnswer={this.submitAnswer}
                        question={this.props.question}
                        type={this.props.type}
                        textAnswer={this.props.textAnswer}
                        selectAnswer={this.props.selectAnswer}
                        questionIdx={this.props.questionIdx}
                    />
                }
            </>
        );
    }
}