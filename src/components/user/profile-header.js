import React from "react"
import { Skeleton, Button, Row, Col } from 'antd';
import SkillBarChart from 'components/skill/bar-chart'
import AvatarImage from 'components/avatar/image'
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
import ErrorResult from 'components/error/result'
import SnsLinks from "./snsLink";

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


const UserDescription = ({ description, selfSearch }) => {
    if (!description && selfSearch) return <Button onClick={() => navigate('/account/settings/base')}>自己紹介を追加する</Button>
    return <p>{description}</p>
}

const ProfileHeader = ({ data, selfSearch }) => {
    return (
        <Row type="flex" align="top" style={{ padding: '20px' }}>
            <Col xs={24} sm={3} md={2} lg={2} xl={2} xxl={2}>
                <AvatarImage imageUrl={data.imageUrl} displayName={data.displayName} size={60} />
            </Col>
            <Col xs={24} sm={21} md={22} lg={22} xl={22} xxl={22}>
                <Row type="flex" align="top">
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                        <p style={{ fontWeight: '500', fontSize: '18px', marginBottom: '8px' }}>{data.displayName}</p>
                        <SnsLinks twitterId={data.twitterId} facebookId={data.facebookId} url={data.url} />
                        <UserDescription description={data.description} selfSearch={selfSearch} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                        {/* <SkillBarChart /> */}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

const UserProfileHeader = ({ selfSearch, id }) => {
    return selfSearch ?
        <Query
            query={GET_ACCOUNT}
        >
            {({ loading, error, data }) => {
                if (loading) return <Skeleton avatar active paragraph={{ rows: 4 }} />
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
                if (loading) return <Skeleton avatar active paragraph={{ rows: 4 }} />
                if (error) return <ErrorResult />
                return <ProfileHeader data={data.user} selfSearch={selfSearch} />
            }}
        </Query >

}

export default UserProfileHeader;