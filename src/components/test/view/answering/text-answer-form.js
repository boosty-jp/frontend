import React from 'react';
import { connect } from 'react-redux'
import { Input, Icon } from 'antd';
import { updateAnswer } from 'modules/test/view/answer'

const TextAnswerFormComponent = (props) => {
    const { currentIdx, questions, updateAnswer, answers } = props;
    const ownAnswer = answers[currentIdx].answer
    const correctLength = questions[currentIdx].answerLength;

    return (
        <div style={{ marginBottom: '20px' }}>
            <Input
                placeholder="答えを入力してください"
                value={ownAnswer}
                onChange={(e) => updateAnswer(e.target.value)}
            />
            {questions[currentIdx].showCount &&
                <p style={{ marginTop: '12px' }}>
                    <Icon type="bulb" style={{ marginRight: '8px' }} />
                    答えの文字数:  {ownAnswer.length} / {correctLength}
                    {ownAnswer.length === correctLength ?
                        <Icon type="check" style={{ marginLeft: '8px', color: 'green' }} />
                        :
                        <Icon type="close" style={{ marginLeft: '8px', color: 'red' }} />
                    }
                </p>
            }
        </div>
    );
}

const mapStateToProps = state => ({
    questions: state.testAnswer.questions,
    currentIdx: state.testAnswer.currentIdx,
    answers: state.testAnswer.answers,
})

const mapDispatchToProps = dispatch => ({
    updateAnswer: (answer) => dispatch(updateAnswer(answer)),
})

const TextAnswerForm = connect(mapStateToProps, mapDispatchToProps)(TextAnswerFormComponent)
export default TextAnswerForm