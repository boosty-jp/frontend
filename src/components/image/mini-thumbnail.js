import React from "react"
import { image } from "components/editor/tool/image";

const MiniThumbnailImage = ({ imageUrl }) => {
    if (!imageUrl) return <></>

    return (
        <div
            style={{
                width: '64px',
                paddingTop: '56.25%',
                backgroundSize: 'cover',
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: 'center center',
            }} />
    )
}

export default MiniThumbnailImage;