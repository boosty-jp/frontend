import React from "react"

const BookCoverImage = ({ imageUrl }) => {
    if (!imageUrl) return <></>

    return (
        <div
            style={{
                width: '100%',
                paddingTop: '130%',
                backgroundSize: 'cover',
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: 'center center',
                boxShadow: "2px 2px 8px gray !important",
            }} />
    )
}

export default BookCoverImage;