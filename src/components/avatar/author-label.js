import React from 'react'
import AvatarImage from 'components/avatar/image'

const AuthorLabel = ({ imageUrl, name, size = 26 }) => {
    return (
        <div >
            <AvatarImage imageUrl={imageUrl} displayName={name} style={{ width: size + 'px', height: size + 'px', fontSize: (size / 2) + 'px' }} size={size} />
            <span style={{
                fontSize: (size / 2),
                color: '#222',
                marginLeft: '6px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }}>{name}</span>
        </div>
    )
}

export default AuthorLabel