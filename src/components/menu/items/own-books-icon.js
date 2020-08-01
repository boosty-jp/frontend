import React from "react"
import { Link } from 'gatsby'
import { Tooltip } from 'antd';
import { ReadOutlined } from '@ant-design/icons'

const OwnBooksIcon = () => {
    return (
        <Link to="/book/own" style={{ marginRight: '18px' }}>
            <Tooltip placement="bottom" title="本棚">
                <ReadOutlined
                    theme="filled"
                    style={{ color: '#595959', fontSize: '20px', verticalAlign: 'middle' }}
                />
            </Tooltip>
        </Link>
    )
}

export default OwnBooksIcon