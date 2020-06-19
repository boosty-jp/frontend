import React from "react"
import { Row, Col, Carousel, Typography, Button } from 'antd'
import BookCoverImage1 from "components/image/hero/book-cover-1"
import BookCoverImage2 from "components/image/hero/book-cover-2"
import BookCoverImage3 from "components/image/hero/book-cover-3"
import BookCoverImage4 from "components/image/hero/book-cover-4"
import { Link } from "gatsby"
const { Title, Paragraph } = Typography;

const HeroComponent = () => {
    return (
        <>
            <div style={{
                backgroundColor: 'white',
                borderBottomLeftRadius: '50%',
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
                    <Row type="flex" align="middle" gutter={32}>
                        <Col xs={16} sm={10} md={10} lg={8} xl={8} style={{ margin: '0 auto' }}>
                            <Carousel autoplay dots={false} effect="fade" >
                                <div >
                                    <Link to="/home">
                                        <BookCoverImage1 />
                                    </Link>
                                </div>
                                <div >
                                    <Link to="/home">
                                        <BookCoverImage2 />
                                    </Link>
                                </div>
                                <div >
                                    <Link to="/home">
                                        <BookCoverImage3 />
                                    </Link>
                                </div>
                                <div >
                                    <Link to="/home">
                                        <BookCoverImage4 />
                                    </Link>
                                </div>
                            </Carousel>
                        </Col>
                        <Col xs={0} sm={14} md={14} lg={16} xl={16} >
                            <Title level={1} style={{ color: 'black', lineHeight: '1.8' }}>技術書をもっと手軽に！</Title>
                            <Paragraph style={{ fontSize: '16px', }}>boosty（ブースティー）はこれまで紙媒体で読んでいた技術書を<br />ブラウザ上でより手軽に見れるサービスです</Paragraph>
                            <Link to="/home">
                                <Button shape="round" type="primary" size="large">技術書を探す</Button>
                            </Link>
                        </Col>
                        <Col xs={24} sm={0} style={{ textAlign: 'center' }}>
                            <Paragraph style={{ color: 'black', fontWeight: 'bold', fontSize: '26px', lineHeight: '1.8' }}>技術書をもっと手軽に！</Paragraph>
                            <Paragraph style={{ fontSize: '16px', }}>boosty（ブースティー）は<br />これまで紙媒体で読んでいた技術書を<br />ブラウザ上でより手軽に見れるサービスです</Paragraph>
                            <Link to="/home">
                                <Button shape="round" type="primary">技術書を探す</Button>
                            </Link>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}
export default HeroComponent