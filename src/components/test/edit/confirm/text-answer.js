import React from 'react';
import { connect } from 'react-redux'
import { Input, Icon } from 'antd';

class TextForm extends React.Component {
    render() {
        return (
            <div style={{ marginBottom: '20px' }}>
                <Input
                    placeholder="答えを入力してください"
                    value={this.props.text}
                    onChange={(e) => this.props.updateAnswer(e.target.value)}
                />
                {this.props.showCount &&
                    <p style={{ marginTop: '12px' }}>
                        <Icon type="bulb" style={{ marginRight: '8px' }} />
                        答えの文字数:  {this.props.text.length} / {this.props.answerText.length}
                        {this.props.text.length === this.props.answerText.length ?
                            <Icon type="check" style={{ marginLeft: '8px', color: 'green' }} />
                            :
                            <Icon type="close" style={{ marginLeft: '8px', color: 'red' }} />
                        }
                    </p>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    answerText: state.testEditQuestion.answer.text.text,
    showCount: state.testEditQuestion.answer.text.showCount,
})

const TextAnswerForm = connect(mapStateToProps)(TextForm)
export default TextAnswerForm