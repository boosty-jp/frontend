import React from "react"
import { Space } from 'antd';
import { Link } from "gatsby";

const DropdownItem = ({ link, icon, title }) => {
    if (!link) {
        return (
            <Space size={1}>
                {icon}
                {title}
            </Space>
        )
    }

    return (
        <Link to={link}>
            <Space size={1}>
                {icon}
                {title}
            </Space>
        </Link>
    )
}

export default DropdownItem