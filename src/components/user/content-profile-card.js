import React from "react"
import { Skeleton, Row, Col } from 'antd';
import AvatarImage from 'components/avatar/image'
import SnsLinks from "./snsLink";

const ContentProfileCard = ({ data }) => {
    if (!data || !data.id) {
        return <Skeleton avatar active paragraph={{ rows: 4 }} />
    }

    return (
        <Row type="flex" align="top" gutter={[16, 16]}>
            <Col xs={24} sm={4} md={3} lg={3} xl={3} xxl={3}>
                <AvatarImage
                    size={60}
                    imageUrl={data.imageUrl}
                    displayName={data.displayName}
                />
            </Col>
            <Col xs={24} sm={20} md={21} lg={21} xl={21} xxl={21}>
                <p style={{ fontWeight: '500', fontSize: '18px', marginBottom: '8px' }}>{data.displayName}</p>
                <SnsLinks twitterId={data.twitterId} githubId={data.githubId} url={data.url} />
                <p>{data.description}</p>
            </Col>
        </Row>
    );
}


export default ContentProfileCard;