import React from 'react';
import { Alert } from 'antd';
import { Link } from 'gatsby';
import { EditOutlined } from '@ant-design/icons';

const PreviewAlert = ({ link, style }) => {
    return (
        <Alert
            showIcon
            type="info"
            style={style}
            message={
                <>
                    <span>プレビューモード</span>
                    <span style={{ float: 'right' }}>
                        <Link to={link}><EditOutlined style={{ marginRight: '4px' }} />編集する</Link>
                    </span>
                </>
            }
        />
    )
}

export default PreviewAlert;