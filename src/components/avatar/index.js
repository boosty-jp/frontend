import React from 'react'
import { Avatar } from 'antd'

const AvatarLabel = ({ image, updateDate, name }) => {
    return (
        <div style={{ display: 'flex' }}>
            <Avatar src={image} style={{ flex: '0 0 auto', width: '28px', height: '28px' }} />
            <div style={{ height: '30px', marginLeft: '4px', fontSize: '12px', color: '#222', fontWeight: '400', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <p style={{ height: '15px', fontSize: '12px', color: '#222', margin: '0', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</p>
                <p style={{ height: '15px', fontSize: '12px', color: 'grey', marginBottom: '0px' }}>{updateDate}に更新</p>
            </div>
        </div>
    )
}

export default AvatarLabel