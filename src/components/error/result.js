import React from "react"
import { Result, Button } from 'antd';

const ErrorResult = ({ title }) => {
    if (!title) title = "エラーが発生しました"
    return (
        <Result
            status="error"
            title={title}
            extra={
                <Button type="primary" key="console" onClick={() => window.location.reload()} >リロードする</ Button>
            }
        />
    )
}
export default ErrorResult;