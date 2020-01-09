import React from 'react';
import SelectAnswerForm from 'components/test/edit/confirm/select-answer'
import { Button, Divider } from 'antd';
import TextAnswerForm from './text-answer';

const QuestionConfirmForm = ({ question, updateAnswer, type, textAnswer, selectAnswer, ownAnswer, submitAnswer, questionIdx }) => {
    return (
        <>
            <p style={{ fontWeight: '500', fontSize: '20px', marginTop: '50px', marginBottom: '0px' }}>
                {questionIdx ?
                    <>問題{questionIdx}.</>
                    :
                    <>問題.</>
                }
            </p>
            <div style={{ marginTop: '30px' }}>
                {question}
            </div>
            <Divider />
            {type === 'select' && <SelectAnswerForm updateAnswer={updateAnswer} candidates={selectAnswer} />}
            {type === 'text' && <TextAnswerForm updateAnswer={updateAnswer} ownAnswer={ownAnswer} answer={textAnswer} />}
            <Button type="primary" onClick={submitAnswer}>解答する</Button>
            <div style={{ height: '50px' }}></div>
        </>
    );
}

export default QuestionConfirmForm