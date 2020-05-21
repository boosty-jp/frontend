import React from "react"
import { Avatar } from 'antd';

const SalesPointNumber = ({ number, size, style }) => {
    let avatarSize = "default"
    if (size) { avatarSize = size; }

    return (
        <Avatar size={avatarSize} style={{ ...style, backgroundColor: "#1890ff" }}>{number + 1}</Avatar>
    )
}
export default SalesPointNumber