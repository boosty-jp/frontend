import React from "react"
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'

const PageLoader = ({ children }) => {
    return (
        <Spin
            spinning
            tip="ロード中です"
            indicator={< LoadingOutlined style={{ fontSize: 24 }} spin />}
        >
            <div style={{ minHeight: '200px' }}>
                {children}
            </div>
        </Spin>
    )
}

export default PageLoader