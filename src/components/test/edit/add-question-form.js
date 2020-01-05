import React from 'react';
import { Button, Steps, Icon } from 'antd';
import QuestionForm from 'components/test/edit/question'
import ExplanationsForm from 'components/test/edit/explanations';

const { Step } = Steps;

const steps = [
    {
        title: '問題',
        content: 'question',
    },
    {
        title: '解説',
        content: 'solution',
    },
    {
        title: '確認',
        content: 'confirm',
    },
];

class AddQuestionForm extends React.Component {
    state = {
        visible: false,
        currentStep: 0,
        childrenDrawer: false
    };

    onChange = value => {
        this.setState({ currentStep: value });
    };

    render() {
        return (
            <div style={{ maxWidth: '740px', width: '100%', margin: ' 20px auto', }}>
                <Steps current={this.state.currentStep} onChange={this.onChange}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div style={{ marginTop: '30px' }}>
                    {this.state.currentStep === 0 && <QuestionForm />}
                    {this.state.currentStep === 1 && <ExplanationsForm />}
                    {this.state.currentStep === 2 && <QuestionForm />}
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
                            <Button onClick={this.props.onClose} type="primary"><Icon type="check" />作成</Button>
                        </>
                    }
                </div>

            </div>
        );
    }
}

export default AddQuestionForm;