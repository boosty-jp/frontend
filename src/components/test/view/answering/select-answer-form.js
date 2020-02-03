import React from 'react';
import { connect } from 'react-redux'
import { Radio } from 'antd';
import { updateAnswer } from 'modules/test/view/answer'

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    marginBottom: '14px'
};

const SelectAnswerFormComponent = (props) => {
    const { currentIdx, questions, updateAnswer, answers } = props;
    const candidates = questions[currentIdx].candidates
    let ownAnswer = undefined;
    for (let i = 0; i < candidates.length; ++i) {
        if (candidates[i] === answers[currentIdx].answer) {
            ownAnswer = i;
            break;
        }
    }

    return (
        <div style={{ marginBottom: '20px' }}>
            <Radio.Group
                value={ownAnswer}
                style={{ width: '100%' }}
                onChange={e => updateAnswer(candidates[e.target.value], "select")}
            >
                {candidates.map((c, idx) => {
                    return (
                        <Radio style={radioStyle} value={idx} key={"candidate-" + idx}>
                            {c}
                        </Radio>
                    )
                })}
            </Radio.Group>
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

const SelectAnswerForm = connect(mapStateToProps, mapDispatchToProps)(SelectAnswerFormComponent)
export default SelectAnswerForm