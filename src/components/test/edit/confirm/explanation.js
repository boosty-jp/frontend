import React from 'react';
import { connect } from 'react-redux'
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

class ExplanationConfirmFormComponent extends React.Component {
    render() {
        let wrongAnswer = true;
        let correctAnswer = '';
        if (this.props.type === 'select') {
            for (let i = 0; i < this.props.answer.select.length; ++i) {
                if (this.props.answer.select[i].answer) {
                    correctAnswer = this.props.answer.select[i].text;
                    wrongAnswer = this.props.ownAnswer !== correctAnswer;
                    break;
                }
            }
        } else if (this.props.type === 'text') {
            correctAnswer = this.props.answer.text.text;
            wrongAnswer = this.props.ownAnswer !== correctAnswer;
        }

        return (
            <>
                {wrongAnswer ?
                    <Result status="error" title="不正解" />
                    :
                    <Result status="success" title="正解" />
                }
                <p style={{ fontWeight: '500', fontSize: '20px', marginBottom: '18px' }}>解答: {correctAnswer}</p>

                {this.props.explanations.map((explanation, index) => {
                    const ExplanationBlocks = () => {
                        const { text } = convertToJSX(explanation.blocks);
                        return text;
                    }
                    const ReferenceBlocks = () => {
                        return explanation.references.map(r => { return convertToReferenceCard(r) });
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
                <Button onClick={this.props.reset} style={{ marginTop: '20px' }}>問題に戻る</Button>
                <div style={{ height: '50px' }}></div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    type: state.testEditQuestion.type,
    answer: state.testEditQuestion.answer,
    explanations: state.testEditQuestion.explanations,
})

const ExplanationConfirmForm = connect(mapStateToProps)(ExplanationConfirmFormComponent)
export default ExplanationConfirmForm