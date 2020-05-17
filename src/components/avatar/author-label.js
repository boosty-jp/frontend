import React from 'react'
import AvatarImage from 'components/avatar/image'
import { Link } from '@reach/router'
import { createUserLink } from 'utils/link-generator'

const AuthorLabel = ({ id, imageUrl, name, size = 26 }) => {
    return (
        <div >
            <Link to={createUserLink(id)}>
                <AvatarImage imageUrl={imageUrl} displayName={name} style={{ width: size + 'px', height: size + 'px', fontSize: (size / 2) + 'px' }} size={size} />
                <span style={{
                    fontSize: ((size / 2) + 1),
                    color: '#222',
                    marginLeft: '6px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>{name}</span>
            </Link>
        </div>
    )
}

export default AuthorLabel