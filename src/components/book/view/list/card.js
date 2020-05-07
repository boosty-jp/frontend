import React from "react"
import { Typography } from 'antd';
import BookCoverImage from "components/image/cover";
import AuthorLabel from "components/avatar/author-label";
const { Paragraph } = Typography;

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '10px',
    fontColor: 'black',
}

const bookStyle = {
    margin: '0 auto',
    width: '100%',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
}

const BookListCard = ({ imageUrl, title, author, price }) => {
    return (
        <div style={{
            ...cardStyle,
        }} >
            <div style={bookStyle}>
                <BookCoverImage imageUrl={imageUrl} />
            </div>
            <div style={{ margin: '10px 12px 0px 12px' }}>
                <Paragraph ellipsis style={{ color: 'black', fontSize: '14px', marginBottom: '4px' }}>
                    {title}
                </Paragraph>
                <AuthorLabel name={author.name} size={22} />
                {/* <Statistic value={price} suffix="円" /> */}
            </div>
        </div>
    )
}

export default BookListCard