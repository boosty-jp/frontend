import React from "react"
import { Button } from 'antd';

const SimpleShadowButton = ({ color, text }) => {
    return (
        <Button
            type="primary"
            shape="round"
            style={{
                backgroundColor: color,
                borderColor: color,
                color: 'white',
                boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
            }}
        >{text}</Button >
    )
}

export default SimpleShadowButton