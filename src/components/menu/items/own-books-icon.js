import React from "react"
import { Icon } from 'antd';
import { Link } from 'gatsby'

const OwnBooksIcon = () => {
    return (
        <Link to="/book/own">
            <Icon type="appstore" style={{ color: '#595959', fontSize: '20px', marginRight: '20px', verticalAlign: 'middle' }} theme="filled" />
        </Link>
    )
}

export default OwnBooksIcon