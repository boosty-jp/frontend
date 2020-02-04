import React from "react"
import { Skeleton, Button, Row, Col, Typography } from 'antd';
import AvatarImage from 'components/avatar/image'
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
import ErrorResult from 'components/error/result'
import SnsLinks from "./snsLink";

const { Paragraph } = Typography;

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const GET_USER = gql`
  query GetUser($userId: ID!) {
    user (userId: $userId){
        id
        displayName
        description
        url
        imageUrl
        twitterId
        facebookId
    }
}
`;

const GET_ACCOUNT = gql`
  query GetAccount {
    account {
        user{
            id
            displayName
            description
            url
            imageUrl
            twitterId
            facebookId
        }
    }
}
`;

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

const ProfileHeader = ({ data, selfSearch }) => {
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

const SkeletonCard = () => {
    return (
        <div style={cardStyle}>
            <Skeleton avatar active paragraph={{ rows: 4 }} />
        </div>
    )
}

const UserProfileHeader = ({ selfSearch, id }) => {
    return selfSearch ?
        <Query
            query={GET_ACCOUNT}
        >
            {({ loading, error, data }) => {
                if (loading) return <SkeletonCard />
                if (error) return <ErrorResult />
                return <ProfileHeader data={data.account.user} selfSearch={selfSearch} />
            }}
        </Query >
        :
        <Query
            query={GET_USER}
            variables={{ userId: id }}
        >
            {({ loading, error, data }) => {
                if (loading) return <SkeletonCard />
                if (error) return <ErrorResult />
                return <ProfileHeader data={data.user} selfSearch={selfSearch} />
            }}
        </Query >

}

export default UserProfileHeader;