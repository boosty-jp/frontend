import React from "react"
import { Result, Button } from 'antd'
import { Link } from "gatsby"
import { IdcardTwoTone } from '@ant-design/icons';

const NeedLoginComponent = () => {
    return (
        <Result
            icon={<IdcardTwoTone />}
            title="ログインが必要です"
            extra={
                <>
                    <div>
                        <Link to="/login">
                            <Button type="primary">ログインページへ</Button>
                        </Link>
                    </div>
                    <p style={{ marginTop: '12px' }}>
                        <Link to="/signup" >会員登録する</Link>
                    </p>
                </>
            }
        />)
}

export default NeedLoginComponent;