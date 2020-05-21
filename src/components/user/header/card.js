import React from "react"
import { Button, Typography } from 'antd';
import AvatarImage from 'components/avatar/image'
import SnsLinks from "../snsLink";

const { Paragraph } = Typography;

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontColor: 'black',
    textAlign: 'center',
}

const UserDescription = ({ description, selfSearch }) => {
    if (!description && selfSearch) return <Button onClick={() => navigate('/account/settings/base')}>自己紹介を追加する</Button>
    return <p>{description}</p>
}

const ProfileHeaderCard = ({ data, selfSearch }) => {
    return (
        <div style={cardStyle}>
            <AvatarImage imageUrl={data.imageUrl} displayName={data.displayName} size={120} />
            <Paragraph ellipsis style={{ fontSize: '20px', marginBottom: '8px', color: 'black' }}>{data.displayName}</Paragraph>
            <SnsLinks twitterId={data.twitterId} githubId={data.githubId} url={data.url} />
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <UserDescription description={data.description} selfSearch={selfSearch} />
            </div>
        </div>
    );
}

export default ProfileHeaderCard;