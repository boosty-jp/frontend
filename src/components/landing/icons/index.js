import React from "react"
import LanguageIcon from "./icon"
import { Row, Col, Typography, Carousel } from 'antd';

const { Paragraph } = Typography;

const firstIcons = [
    "devicon-gradle-plain",
    "devicon-android-plain",
    "devicon-css3-plain",
    "devicon-angularjs-plain",
    "devicon-bootstrap-plain",
    "devicon-git-plain",
    "devicon-html5-plain",
    "devicon-javascript-plain",
    "devicon-linux-plain",
]

const secondIcons = [
    "devicon-postgresql-plain",
    "devicon-python-plain",
    "devicon-rails-plain",
    "devicon-react-original",
    "devicon-redis-plain",
    "devicon-ruby-plain",
    "devicon-swift-plain",
    "devicon-vim-plain",
    "devicon-visualstudio-plain",
]

const thirdIcons = [
    "devicon-mysql-plain",
    "devicon-redhat-plain",
    "devicon-java-plain",
    "devicon-github-plain",
    "devicon-amazonwebservices-original",
    "devicon-nodejs-plain",
    "devicon-php-plain",
    "devicon-docker-plain",
    "devicon-cplusplus-plain",
]

const LanguageIconsComponent = () => {
    return (
        <div style={{ backgroundColor: '#F7FAFF' }}>
            <Row type="flex" justify="space-around" align="middle">
                <Col xs={24} sm={24} md={14} lg={10} xl={10} style={{ marginTop: '20px', color: '#2D2A32', textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                        <Paragraph style={{ color: 'black' }}>オンライン技術書<br />プラットフォーム</Paragraph>
                    </div>
                    <Paragraph >様々なプログラミング言語やカテゴリーを<br />オンラインで学びましょう</Paragraph>
                </Col>
                <Col xs={24} sm={24} md={10} lg={14} xl={14} style={{ marginTop: '20px' }}>
                    <Carousel autoplay dots={false} effect="fade" >
                        <div>
                            <Row type="flex" justify="center">
                                {firstIcons.map((i, idx) => {
                                    return (
                                        <Col span={8} style={{ marginTop: '20px', marginBottom: '20px' }} key={i}>
                                            <LanguageIcon iconClassName={i} idx={idx} />
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>
                        <div>
                            <Row type="flex" justify="center">
                                {secondIcons.map((i, idx) => {
                                    return (
                                        <Col span={8} style={{ marginTop: '20px', marginBottom: '20px' }} key={i}>
                                            <LanguageIcon iconClassName={i} idx={idx} />
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>
                        <div>
                            <Row type="flex" justify="center">
                                {thirdIcons.map((i, idx) => {
                                    return (
                                        <Col span={8} style={{ marginTop: '20px', marginBottom: '20px' }} key={i}>
                                            <LanguageIcon iconClassName={i} idx={idx} />
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>
                    </Carousel>
                </Col>
            </Row>
        </div>
    )
}
export default LanguageIconsComponent