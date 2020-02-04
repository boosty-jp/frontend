import React from "react"
import { Button } from 'antd';

const SimpleBorderedShadowButton = ({ color, text, loading = false, onClick, style, htmlType, size, icon }) => {
    return (
        <Button
            type="primary"
            shape="round"
            style={{
                backgroundColor: "white",
                borderColor: color,
                color: color,
                boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
                ...style
            }}
            loading={loading}
            onClick={onClick}
            htmlType={htmlType}
            size={size}
            icon={icon}
        >{text}</Button >
    )
}

export default SimpleBorderedShadowButton