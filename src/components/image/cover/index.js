import React from "react"

const BookCoverImage = ({ imageUrl, boxShadow = "3px 3px 6px #cdd0d4, -3px -3px 36px #ffffff", borderRadius = "0px" }) => {
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
                borderRadius: borderRadius
            }}
        />
    )
}

export default BookCoverImage;