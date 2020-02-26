import React from "react"
import { Typography } from 'antd';
import BookCoverImage from "components/image/cover";
const { Paragraph } = Typography;

const OwnBookItem = ({ imageUrl, title, author }) => {
    return (
        <div >
            <BookCoverImage imageUrl={imageUrl} boxShadow="2px 2px 4px #cdd0d4, -2px -2px 4px #ffffff" />
            <div style={{ margin: '10px 12px 0px 12px' }}>
                <Paragraph ellipsis style={{ color: 'black', fontSize: '14px', marginBottom: '4px' }}>
                    {title}
                </Paragraph>
                <Paragraph ellipsis style={{ marginBottom: '4px', fontSize: '12px' }}>
                    {author.name}
                </Paragraph>
            </div>
        </div>
    )
}

export default OwnBookItem