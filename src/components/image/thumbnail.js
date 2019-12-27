import React from "react"
import { image } from "components/editor/tool/image";

const ThumbnailImage = ({ imageUrl }) => {
    if (!imageUrl) return <></>

    return (
        <div
            style={{
                width: '100%',
                paddingTop: '56.25%',
                backgroundSize: 'cover',
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: 'center center',
            }} />
    )
}

export default ThumbnailImage;