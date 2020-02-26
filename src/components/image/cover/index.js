import React from "react"

const BookCoverImage = ({ imageUrl, boxShadow = "18px 18px 36px #cdd0d4, -18px -18px 36px #ffffff" }) => {
    if (!imageUrl) return <></>

    return (
        <div
            style={{
                width: '100%',
                paddingTop: '160%',
                backgroundSize: 'cover',
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: 'center center',
                boxShadow: boxShadow,
            }} />
    )
}

export default BookCoverImage;