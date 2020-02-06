import React from "react"

const ThumbnailImage = ({ imageUrl }) => {
    if (!imageUrl) return <></>

    return (
        <div
            style={{
                width: '100%',
                paddingTop: '160%',
                backgroundSize: 'cover',
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: 'center center',
            }} />
    )
}

export default ThumbnailImage;