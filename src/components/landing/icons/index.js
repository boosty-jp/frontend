import React from "react"
import LanguageIcon from "./icon"
import { Row, Col, Typography } from 'antd';

const { Title } = Typography;

const upperIcons = [
    "devicon-gradle-plain",
    "devicon-android-plain",
    "devicon-css3-plain",
    "devicon-angularjs-plain",
    "devicon-bootstrap-plain",
    "devicon-git-plain",
    "devicon-html5-plain",
    "devicon-javascript-plain",
    "devicon-linux-plain",
    "devicon-nodejs-plain",
    "devicon-php-plain",
]

const lowerIcons = [
    "devicon-postgresql-plain",
    "devicon-python-plain",
    "devicon-rails-plain",
    "devicon-react-original",
    "devicon-redis-plain",
    "devicon-ruby-plain",
    "devicon-swift-plain",
    "devicon-vim-plain",
    "devicon-visualstudio-plain",
    "devicon-docker-plain",
    "devicon-cplusplus-plain",
]

const LanguageIconsComponent = () => {
    return (
        <>
            <div style={{
                backgroundColor: '#F7FAFF',
            }}>
                <div style={{ padding: '40px' }}>
                    <Row type="flex" justify="space-around">
                        {upperIcons.map((i, idx) => {
                            return (
                                <Col xs={6} sm={6} md={3} lg={3} xl={3} key={i} style={{ margin: '20px' }}>
                                    <LanguageIcon iconClassName={i} idx={idx} />
                                </Col>
                            )
                        })}
                    </Row>
                    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px' }}>
                        <Title style={{ color: 'black', textAlign: 'center' }}>プログラミング</Title>
                    </div>
                    <Row type="flex" justify="space-around" align="middle">
                        {lowerIcons.map((i, idx) => {
                            return (
                                <Col xs={6} sm={6} md={3} lg={3} xl={3} key={i} style={{ margin: '20px' }}>
                                    <LanguageIcon iconClassName={i} idx={idx} />
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </div>
        </>
    )
}
export default LanguageIconsComponent