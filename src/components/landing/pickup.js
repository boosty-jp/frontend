import React from "react"
import { Button, Typography } from 'antd';
import BookCoverImage from "components/image/cover";
import COVER_IMG from "images/pickup-cover.png"
import { Link } from "gatsby";
import { createBookDetailLink } from "utils/link-generator";

const { Paragraph } = Typography;

const PickupComponent = () => {
    return (
        <div style={{ backgroundColor: '#F7FAFF', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                <Paragraph style={{ color: 'black', marginBottom: '8px' }}>販売中の技術書</Paragraph>
            </div>
            <div style={{ maxWidth: '300px', margin: '40px auto' }}>
                <Link to={createBookDetailLink("bab91e13-0d10-ddbd-cded-7c200426c152")}>
                    <BookCoverImage imageUrl={COVER_IMG} borderRadius="1rem" boxShadow="8px 8px 16px #cdd0d4, -8px -8px 16px #ffffff" />
                </Link>
            </div>
            <Paragraph style={{ textAlign: 'center', color: 'black', fontSize: '18px' }}>
                爆速なサイトを手軽に作れる<br />React製フレームワークGatsbyの入門書<br />
            </Paragraph>
            <Link to={createBookDetailLink("bab91e13-0d10-ddbd-cded-7c200426c152")}>
                <Button type="primary" shape="round">詳細を見る</Button>
            </Link>
        </div>
    )
}
export default PickupComponent