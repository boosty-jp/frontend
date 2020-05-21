import React from "react"
import { Row, Col, Statistic } from "antd"
import CardImage from '../../../images/course/card'
import PagesImage from '../../../images/course/pages'
import TestImage from '../../../images/course/tests'

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '0px 20px 20px 20px',
    fontSize: 'bold',
    fontColor: 'black',
}

const contentCardStyle = {
    borderRadius: '1rem',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    width: '100%',
    padding: '0px 10px 10px 10px',
    fontSize: 'bold',
    fontColor: 'black',
}

const items = [
    { title: 'ページ', image: <PagesImage />, count: 301, suffix: 'ページ' },
    { title: '単語カード', image: <CardImage />, count: 93, suffix: '枚' },
    { title: '演習問題', image: <TestImage />, count: 200, suffix: '問' },
]

const CourseContentsInfoCard = () => {
    return (
        <div style={{ marginTop: '20px', ...cardStyle }}>
            <Row type="flex" align="top" gutter={12}>
                {items.map(i => {
                    return (
                        <Col xs={24} sm={24} md={8} lg={8} xl={8} key={i.title} style={{ marginTop: '20px' }}>
                            <div style={{ ...contentCardStyle, backgroundColor: '#A5D6FF', textAlign: 'center' }}>
                                <Row type="flex" align="middle" gutter={12} >
                                    <Col span={7} style={{ marginTop: '20px' }}>
                                        {i.image}
                                    </Col>
                                    <Col span={17} style={{ marginTop: '20px' }}>
                                        <span style={{ color: 'black', fontSize: '20px' }}>{i.title}</span>
                                        <Statistic value={i.count} suffix={i.suffix} />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default CourseContentsInfoCard