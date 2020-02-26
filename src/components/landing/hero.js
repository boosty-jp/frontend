import React from "react"
import { Row, Col, Carousel, Typography } from 'antd'
import BookCoverImage1 from "components/image/hero/book-cover-1"
import BookCoverImage2 from "components/image/hero/book-cover-2"
import BookCoverImage3 from "components/image/hero/book-cover-3"
import BookCoverImage4 from "components/image/hero/book-cover-4"
const { Title, Paragraph } = Typography;

const HeroComponent = () => {
    return (
        <>
            <div style={{
                backgroundColor: '#f0f5ff',
                borderBottomLeftRadius: '50%',
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
                    <Row type="flex" align="middle" gutter={32}>
                        <Col span={8}>
                            <Carousel autoplay dots={false} effect="fade" >
                                <div >
                                    <BookCoverImage1 />
                                </div>
                                <div >
                                    <BookCoverImage2 />
                                </div>
                                <div >
                                    <BookCoverImage3 />
                                </div>
                                <div >
                                    <BookCoverImage4 />
                                </div>
                            </Carousel>
                        </Col>
                        <Col span={16}>
                            <Title level={1} style={{ color: 'black', lineHeight: '1.8' }}>技術書をもっと手軽に！</Title>
                            <Paragraph style={{ fontSize: '16px', color: 'black' }}>boosty（ブースティー）は、学習コストの高い専門知識を効率的に学習できるよう支援するサービスです</Paragraph>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}
export default HeroComponent