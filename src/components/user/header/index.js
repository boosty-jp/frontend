import React from "react"
import { Skeleton } from 'antd';
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
import ErrorResult from 'components/error/result'
import ProfileHeaderCard from 'components/user/header/card'

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
                return <ProfileHeaderCard data={data.account.user} selfSearch={selfSearch} />
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
                return <ProfileHeaderCard data={data.user} selfSearch={selfSearch} />
            }}
        </Query >

}

export default UserProfileHeader;