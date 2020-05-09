import React from "react"
import { Button } from "antd"
import { TwitterOutlined } from "@ant-design/icons"
import FACEBOOK_IMG from 'images/facebook_high_res.png'

const SnsShareButtons = (props) => {
    return (
        <div>
            <Button
                size="large"
                shape="circle"
                icon={<TwitterOutlined style={{ color: '#1890ff', fontSize: '20px', color: 'white' }} />}
                style={{
                    marginRight: '8px',
                    verticalAlign: 'middle',
                    background: '#1890ff',
                    border: '1px solid #1890ff',
                    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
                }}
            >
            </Button>
            <Button
                size="large"
                shape="circle"
                icon={<img src={FACEBOOK_IMG} style={{ width: '24px', height: 'auto', marginTop: '-8px' }} />}
                style={{
                    marginRight: '8px',
                    verticalAlign: 'middle',
                    background: '#1977F2',
                    border: '1px solid #1977F2',
                    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
                }}
            >
            </Button>
        </div>
    )
}

export default SnsShareButtons;