import React from "react"
import { Button, Row, Col, Typography } from 'antd';
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
}

const UserDescription = ({ description, selfSearch }) => {
    if (!description && selfSearch) return <Button onClick={() => navigate('/account/settings/base')}>自己紹介を追加する</Button>
    return <p>{description}</p>
}

const ProfileHeaderCard = ({ data, selfSearch }) => {
    return (
        <div style={cardStyle}>
            <Row type="flex" align="top" gutter={32}>
                <Col xs={0} sm={8} md={6} lg={6} xl={6} xxl={6} style={{ textAlign: 'right' }}>
                    <AvatarImage imageUrl={data.imageUrl} displayName={data.displayName} size={120} />
                </Col>
                <Col xs={0} sm={16} md={18} lg={18} xl={18} xxl={18} >
                    <Paragraph ellipsis style={{ fontSize: '20px', marginBottom: '8px', color: 'black' }}>{data.displayName}</Paragraph>
                    <SnsLinks twitterId={data.twitterId} facebookId={data.facebookId} url={data.url} />
                    <UserDescription description={data.description} selfSearch={selfSearch} />
                </Col>
                <Col xs={24} sm={0} md={0} lg={0} xl={0} xxl={0} style={{ textAlign: 'center' }}>
                    <AvatarImage imageUrl={data.imageUrl} displayName={data.displayName} size={150} />
                </Col>
                <Col xs={24} sm={0} md={0} lg={0} xl={0} xxl={0} style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Paragraph ellipsis style={{ fontSize: '20px', marginBottom: '8px', color: 'black' }}>{data.displayName}</Paragraph>
                    <SnsLinks twitterId={data.twitterId} facebookId={data.facebookId} url={data.url} />
                    <UserDescription description={data.description} selfSearch={selfSearch} />
                </Col>
            </Row>
        </div>
    );
}

export default ProfileHeaderCard;