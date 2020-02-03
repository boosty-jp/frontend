import React from "react"
import { Breadcrumb, Divider } from 'antd';
import { connect } from 'react-redux'
import { updateAnswer, answerList } from 'modules/test/view/answer'
import { convertToJSX } from 'utils/html-converter'
import TextAnswerForm from "components/test/view/answering/text-answer-form";
import SelectAnswerForm from "components/test/view/answering/select-answer-form";

class QuestionCardComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const question = this.props.questions[this.props.currentIdx];
        try {
            const textBlocks = JSON.parse(question.text).textBlocks;
            const questionText = convertToJSX(textBlocks).text;

            let answerForm;
            if (question.type === 'text') {
                answerForm = <TextAnswerForm />
            } else if (question.type === 'select') {
                answerForm = <SelectAnswerForm />
            } else {
                throw new Error("問題のデータが破損しています");
            }
            return (
                <>
                    <Breadcrumb>
                        <Breadcrumb.Item >
                            <a href="#" onClick={this.props.answerList}>問題一覧</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item >
                            <span>問題.{this.props.currentIdx + 1}</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ marginTop: '30px' }}>
                        <p style={{ color: 'black', fontSize: '20px', fontWeight: '600' }}>問題.{this.props.currentIdx + 1}</p>
                        {questionText}
                        <Divider />
                        {answerForm}
                    </div>
                </>
            )
        } catch (err) {
            return (
                <>Error Data</>
            )
        }
    }
}

const mapStateToProps = state => ({
    questions: state.testAnswer.questions,
    currentIdx: state.testAnswer.currentIdx,
    answers: state.testAnswer.answers,
})

const mapDispatchToProps = dispatch => ({
    updateAnswer: () => dispatch(updateAnswer()),
    answerList: () => dispatch(answerList()),
})

const QuestionCard = connect(mapStateToProps, mapDispatchToProps)(QuestionCardComponent)
export default QuestionCard;