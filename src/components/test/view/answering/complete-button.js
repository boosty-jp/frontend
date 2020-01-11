import React from "react"
import { Button } from 'antd';

const CompleteButton = ({ currentIdx, questions }) => {
    if (currentIdx === questions.length) {
        return (
            <Button
                block
                icon="check"
                type="primary"
                shape="round"
                style={{ marginTop: '10px', marginBottom: '18px', boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)', }}
            >答え合わせする
                </Button >
        )
    }

    return (<></>)
}

export default CompleteButton