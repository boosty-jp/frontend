import React from "react"
import { Skeleton, Result, Button, Row, Col, Icon } from 'antd';
import { presetPalettes } from '@ant-design/colors'
import SkillBarChart from 'components/skill/bar-chart'
import AvatarImage from 'components/avatar/image'
import { Query } from 'react-apollo'
import gql from 'graphql-tag';

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const GET_USER = gql`
  query GetUser {
    user {
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
                        <Links twitterId={data.twitterId} facebookId={data.facebookId} url={data.url} />
                        <UserDescription description={data.description} selfSearch={selfSearch} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                        <SkillBarChart />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

const Links = ({ twitterId, facebookId, url }) => {
    if (!twitterId && !facebookId && !url) return <></>
    return (
        <div style={{ marginBottom: '12px' }}>
            {twitterId ?
                <a href={"https://twitter.com/" + twitterId}>
                    <Icon type="twitter" style={{ color: presetPalettes.blue[4], marginRight: '8px', fontSize: '20px' }} />
                </a>
                :
                <></>
            }
            {facebookId ?
                <a href={"https://facebook.com/" + facebookId}>
                    <Icon type="facebook" theme="filled" style={{ color: presetPalettes.blue[7], marginRight: '12px', fontSize: '20px' }} />
                </a>
                :
                <></>
            }
            {url ?
                <><Icon type="link" style={{ marginRight: '4px', fontSize: '16px' }} /> <a href={url}>{url}</a></>
                :
                <></>
            }
        </div>
    );
}

const ErrorResult = () => {
    return (
        <Result
            status="error"
            title="エラーが発生しました"
            extra={
                <Button type="primary" key="console" onClick={() => window.location.reload()} >リロードする</ Button>
            }
        />
    )
}

const UserProfileHeader = ({ selfSearch, id }) => {
    return selfSearch ?
        <Query
            query={GET_ACCOUNT}
        >
            {({ loading, error, data }) => {
                if (loading) return <Skeleton avatar paragraph={{ rows: 4 }} />
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
                if (loading) return <Skeleton avatar paragraph={{ rows: 4 }} />
                if (error) return <ErrorResult />
                return <ProfileHeader data={data.user} selfSearch={selfSearch} />
            }}
        </Query >

}

export default UserProfileHeader;