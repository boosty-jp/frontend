import React from 'react';
import { connect } from 'react-redux'
import { Button, Steps, Icon, message } from 'antd';
import QuestionForm from 'components/test/edit/question'
import ExplanationsForm from 'components/test/edit/explanations';
import QuestionConfirm from 'components/test/edit/confirm';
import { getAnswerTypeError, getQuestionError, getAnswerTextError, getExplanationsError } from 'utils/content-validator';
import { updateExplanationError, updateQuestionError, clearQuestion } from 'modules/test/edit/question';
import { addQuestion } from 'modules/test/edit/questions';

const { Step } = Steps;

class AddQuestionFormComponent extends React.Component {
    state = {
        visible: false,
        currentStep: 0,
        childrenDrawer: false,
        steps: [
            {
                title: '問題',
                content: 'question',
                status: '',
            },
            {
                title: '解説',
                content: 'solution',
                status: '',
            },
            {
                title: '確認',
                content: 'confirm',
                status: '',
            },
        ]
    };

    onChange = value => {
        // 入力のページの不備をチェックする
        // 不備のある状態で次のページへ進めないようにする
        if (this.state.currentStep === 0) {
            if (!this.validQuestionPage()) {
                message.error("入力の不備を修正してください");
                return;
            }
            if (value === 2) {
                // 解説ページのチェック
                if (!this.validateExplanationPage()) {
                    message.error("入力の不備を修正してください");
                    return;
                }
            }
        } else if (this.state.currentStep === 1 && value === 2) {
            // 解説ページのチェック
            if (!this.validateExplanationPage()) {
                message.error("入力の不備を修正してください");
                return;
            }
        }


        this.setState({ currentStep: value });
    };

    validQuestionPage = () => {
        const questionError = getQuestionError(this.props.questionBlockCount, this.props.questionTextCount);
        const typeError = getAnswerTypeError(this.props.type);
        let errorMappedAnswer;
        let answerError = false;
        if (this.props.type === 'select') {
            errorMappedAnswer = [];
            for (let i = 0; i < this.props.answer.select.length; ++i) {
                const selectError = getAnswerTextError(this.props.answer.select[i].text);
                if (selectError.status === 'error') {
                    answerError = true;
                }
                errorMappedAnswer.push({
                    ...this.props.answer.select[i],
                    error: selectError
                });
            }
        } else if (this.props.type === 'text') {
            const typeError = getAnswerTextError(this.props.answer.text.text);
            if (typeError.status === 'error') {
                answerError = true;
            }
            errorMappedAnswer = { ...this.props.answer.text, error: typeError };
        }
        // フォームへのエラーマッピング
        this.props.updateQuestionError(questionError, typeError, errorMappedAnswer);

        // ページナビゲーションへのエラー表示
        if (questionError.status === 'error' || typeError.status === 'error' || answerError) {
            const erroredSteps = this.state.steps.concat();
            erroredSteps[0].status = 'error';
            this.setState({ steps: erroredSteps })
            return false;
        } else {
            const successSteps = this.state.steps.concat();
            successSteps[0].status = '';
            this.setState({ steps: successSteps })
            return true;
        }
    }

    validateExplanationPage = () => {
        const explanationError = getExplanationsError(this.props.explanations);
        this.props.updateExplanationError(explanationError);

        // ページナビゲーションへのエラー表示
        if (explanationError.status === 'error') {
            const erroredSteps = this.state.steps.concat();
            erroredSteps[1].status = 'error';
            this.setState({ steps: erroredSteps })
            return false;
        } else {
            const successSteps = this.state.steps.concat();
            successSteps[1].status = '';
            this.setState({ steps: successSteps })
            return true;
        }
    }

    addQuestion = () => {
        if (this.props.questions.length >= 20) {
            message.error("追加できる問題数は20までです");
            return;
        }

        let answer;
        if (this.props.type === 'select') {
            answer = this.props.answer.select;
        } else if (this.props.type === 'text') {
            answer = this.props.answer.text;
        }

        this.props.addQuestion({
            questionBlocks: this.props.questionBlocks,
            type: this.props.type,
            answer: answer,
            explanations: this.props.explanations,
        });

        this.setState({ currentStep: 0 })
        this.props.clearQuestion();
        this.props.onClose();
    }
    render() {
        return (
            <div style={{ maxWidth: '740px', width: '100%', margin: ' 20px auto', }}>
                <Steps current={this.state.currentStep} onChange={this.onChange} >
                    {this.state.steps.map(item => (
                        <Step key={item.title} title={item.title} status={item.status} />
                    ))}
                </Steps>
                <div style={{ marginTop: '30px' }}>
                    {this.state.currentStep === 0 && <QuestionForm />}
                    {this.state.currentStep === 1 && <ExplanationsForm />}
                    {this.state.currentStep === 2 && <QuestionConfirm />}
                </div>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e8e8e8',
                        padding: '10px 16px',
                        textAlign: 'center',
                        left: 0,
                        background: '#fff',
                        borderRadius: '0 0 4px 4px',
                        zIndex: '2',
                    }}
                >
                    {this.state.currentStep === 0 &&
                        <>
                            <Button style={{ marginRight: 16 }} onClick={this.props.onClose}>キャンセル</Button>
                            <Button onClick={() => this.onChange(1)} type="primary" ghost>次へ<Icon type="right" /></Button>
                        </>
                    }
                    {this.state.currentStep === 1 &&
                        <>
                            <Button style={{ marginRight: 16 }} onClick={() => this.onChange(0)}><Icon type="left" />前へ</Button>
                            <Button onClick={() => this.onChange(2)} type="primary" ghost>次へ<Icon type="right" /></Button>
                        </>
                    }
                    {this.state.currentStep === 2 &&
                        <>
                            <Button style={{ marginRight: 16 }} onClick={() => this.onChange(1)}><Icon type="left" />前へ</Button>
                            <Button onClick={this.addQuestion} type="primary">作成</Button>
                        </>
                    }
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    questions: state.testEditQuestions.questions,
    questionBlocks: state.testEditQuestion.questionBlocks,
    questionTextCount: state.testEditQuestion.questionTextCount,
    questionBlockCount: state.testEditQuestion.questionBlockCount,
    type: state.testEditQuestion.type,
    answer: state.testEditQuestion.answer,
    explanations: state.testEditQuestion.explanations,
})

const mapDispatchToProps = dispatch => ({
    addQuestion: (question) => dispatch(addQuestion(question)),
    clearQuestion: () => dispatch(clearQuestion()),
    updateQuestionError: (questionError, typeError, errorMappedAnswer) => dispatch(updateQuestionError(questionError, typeError, errorMappedAnswer)),
    updateExplanationError: (explanationError) => dispatch(updateExplanationError(explanationError)),
})

const AddQuestionForm = connect(mapStateToProps, mapDispatchToProps)(AddQuestionFormComponent)
export default AddQuestionForm;