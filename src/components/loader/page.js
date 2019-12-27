import React from "react"
import { Spin, Icon } from 'antd';

const PageLoader = ({ children }) => {
    return (
        <Spin
            spinning
            tip="ロード中です"
            indicator={< Icon type="loading" style={{ fontSize: 24 }} spin />}
        >
            <div style={{ minHeight: '200px' }}>
                {children}
            </div>
        </Spin>
    )
}

export default PageLoader