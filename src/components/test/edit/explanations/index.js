import React from 'react';
import { connect } from 'react-redux'
import { Button, Drawer, message, Icon, Form, Tooltip } from 'antd';
import { clearExplanation } from 'modules/test/edit/explanation'
import { addExplanation } from 'modules/test/edit/question'
import { getExplanationTextError, getReferenceError } from 'utils/content-validator'
import ExplanationList from 'components/test/edit/explanations/explanation-list';
import ReferenceForm from 'components/test/edit/explanations/references'
import ExplanationTextForm from 'components/test/edit/explanations/explanation-text'

class ExplanationsFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
    }

    showDrawer = () => {
        this.setState({ visible: true })
    }

    addExplanation = () => {
        const blockError = getExplanationTextError(this.props.blockCount, this.props.textCount);
        const referenceError = getReferenceError(this.props.references);
        if (blockError.status === 'error') {
            message.error('解説内容に不備があります。')
            return;
        }

        if (referenceError.status === 'error') {
            message.error('参考情報に不備があります。')
            return;
        }

        this.props.addExplanation(this.props.references, this.props.blocks);
        this.props.clearExplanation();
        this.setState({ visible: false });
    }

    render() {
        return (
            <>
                <Form>
                    <Form.Item
                        label={
                            <span>
                                解説&nbsp;
                                <Tooltip title="5つまで作成できます">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                    >
                        <ExplanationList />
                    </Form.Item>
                </Form>
                <Button
                    type="dashed"
                    icon="plus"
                    onClick={this.showDrawer}
                    disabled={this.props.explanations.length >= 5}
                    style={{ width: '100%' }}
                >追加する</Button>
                <div style={{ height: '60px' }}></div>
                <Drawer
                    height="90%"
                    placement="top"
                    closable={false}
                    onClose={() => this.setState({ visible: false })}
                    visible={this.state.visible}
                >
                    {this.state.visible &&
                        <div style={{ maxWidth: '740px', width: '100%', margin: ' 20px auto', }}>
                            <Form>
                                <ExplanationTextForm />
                                <ReferenceForm />
                            </Form>
                            <div style={{ height: '40px' }}></div>
                        </div>
                    }
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
                        <Button onClick={() => this.setState({ visible: false })} style={{ marginRight: '12px' }}>キャンセル</Button>
                        <Button onClick={this.addExplanation} type="primary">追加する</Button>
                    </div>
                </Drawer>
            </>
        );
    }
}

const mapStateToProps = state => ({
    references: state.testEditExplanation.references,
    blocks: state.testEditExplanation.blocks,
    textCount: state.testEditExplanation.textCount,
    blockCount: state.testEditExplanation.blockCount,
    explanations: state.testEditQuestion.explanations,
})

const mapDispatchToProps = dispatch => ({
    addExplanation: (references, blocks) => dispatch(addExplanation(references, blocks)),
    clearExplanation: () => dispatch(clearExplanation()),
})

const ExplanationsForm = connect(mapStateToProps, mapDispatchToProps)(ExplanationsFormComponent)
export default ExplanationsForm;