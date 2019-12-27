import React from "react"
import { PageHeader, Row, Col, Statistic, Icon, Divider } from 'antd';
import gql from 'graphql-tag';
import { presetPalettes } from '@ant-design/colors'

const GET_USER = gql`
  query GetUser {
    user {
        id
        displayName
        imageUrl
        description
        url
        twitterId
        facebookId
    }
}
`;

const ProfileHeader = () => (
    <PageHeader
        title="Tomoki Yamashita"
        avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
    >
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={12} lg={14} xl={14}>
                <p>weverの運営者です。JavaとReactを使って開発を行っております。今後のロードマップについてはお気軽にお問い合わせください。お仕事のご依頼はメールアドレスまでお願いいたします。</p>
                <Icon type="twitter" style={{ color: presetPalettes.blue[4], marginRight: '8px', fontSize: '20px' }} />
                <Icon type="facebook" theme="filled" style={{ color: presetPalettes.blue[7], marginRight: '12px', fontSize: '20px' }} />
                <Icon type="link" style={{ marginRight: '4px', fontSize: '16px' }} /><a>http:tomokiya.co.jp</a>
            </Col>
            <Col xs={24} sm={12} md={12} lg={10} xl={10} style={{ textAlign: 'right' }}>
                <div style={{ display: 'inline-block', textAlign: 'center' }}>
                    <Statistic title="スキル数" value={28} />
                </div>
                <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                    <Divider type="vertical" style={{ height: '60px' }} />
                </div>
                <div style={{ display: 'inline-block', textAlign: 'center' }}>
                    <Statistic title="コース数" value={13} />
                </div>
                <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                    <Divider type="vertical" style={{ height: '60px' }} />
                </div>
                <div style={{ display: 'inline-block', textAlign: 'center' }}>
                    <Statistic title="記事数" value={3} />
                </div>
            </Col>
        </Row>
    </PageHeader>
)

export default ProfileHeader