import React from "react"
import { Button, Icon } from 'antd';

const ProgressButton = ({ prevQuestion, nextQuestion, currentIdx, questions }) => {
    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <Button
                    ghost
                    type="primary"
                    shape="round"
                    onClick={prevQuestion}
                    disabled={currentIdx === 0}
                    style={{ marginRight: 16, boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)', }}
                >
                    <Icon type="left" />前へ
                                </Button>
                <Button
                    ghost
                    type="primary"
                    shape="round"
                    onClick={nextQuestion}
                    disabled={currentIdx === questions.length}
                    style={{ boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)', }}
                >次へ<Icon type="right" />
                </Button >
            </div>
        </>
    )
}
export default ProgressButton