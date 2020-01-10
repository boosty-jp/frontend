import React from 'react';
import { Button, Result, Collapse, Icon } from 'antd';
import { convertToJSX, convertToReferenceCard } from 'utils/html-converter'

const { Panel } = Collapse;

const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
};

const ExplanationConfirmForm = ({ type, selectAnswer, textAnswer, ownAnswer, explanations, reset }) => {
    let wrongAnswer = true;
    let correctAnswer = '';
    if (type === 'select') {
        for (let i = 0; i < selectAnswer.length; ++i) {
            if (selectAnswer[i].answer) {
                correctAnswer = selectAnswer[i].text;
                wrongAnswer = ownAnswer !== correctAnswer;
                break;
            }
        }
    } else if (type === 'text') {
        correctAnswer = textAnswer.text;
        wrongAnswer = ownAnswer !== correctAnswer;
    }

    return (
        <>
            {wrongAnswer ?
                <Result status="error" title="不正解" />
                :
                <Result status="success" title="正解" />
            }
            <p style={{ fontWeight: '500', fontSize: '20px', marginBottom: '18px' }}>解答: {correctAnswer}</p>

            {explanations.map((explanation, index) => {
                const ExplanationBlocks = () => {
                    const { text } = convertToJSX(explanation.blocks);
                    return text;
                }
                const ReferenceBlocks = () => {
                    return explanation.references.map(r => { return convertToReferenceCard(r, 'reference-block-' + r.id) });
                }
                return (
                    <div
                        style={{
                            padding: '10px 16px',
                            borderRadius: '0.25rem',
                            border: '1px solid #d9d9d9',
                            background: 'white'
                        }}
                    >
                        <p style={{ marginBottom: '0px', fontWeight: '500', fontSize: '16px' }}>解説{index + 1}</p>
                        <div style={{ lineHeight: '1.5' }}>
                            <ExplanationBlocks />
                            <Collapse
                                bordered={false}
                                defaultActiveKey={1}
                                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                            >
                                <Panel header="参考情報" key="1" style={customPanelStyle}>
                                    <ReferenceBlocks />
                                </Panel>
                            </Collapse>
                        </div>
                    </div>
                )
            })}
            <Button onClick={reset} style={{ marginTop: '20px' }}>問題に戻る</Button>
            <div style={{ height: '50px' }}></div>
        </>
    );
}

export default ExplanationConfirmForm