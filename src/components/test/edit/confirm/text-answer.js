import React from 'react';
import { Input, Icon } from 'antd';

const TextAnswerForm = ({ answer, updateAnswer, ownAnswer }) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <Input
                placeholder="答えを入力してください"
                value={ownAnswer}
                onChange={(e) => updateAnswer(e.target.value)}
            />
            {answer.showCount &&
                <p style={{ marginTop: '12px' }}>
                    <Icon type="bulb" style={{ marginRight: '8px' }} />
                    答えの文字数:  {ownAnswer.length} / {answer.text.length}
                    {ownAnswer.length === answer.text.length ?
                        <Icon type="check" style={{ marginLeft: '8px', color: 'green' }} />
                        :
                        <Icon type="close" style={{ marginLeft: '8px', color: 'red' }} />
                    }
                </p>
            }
        </div>
    );
}

export default TextAnswerForm