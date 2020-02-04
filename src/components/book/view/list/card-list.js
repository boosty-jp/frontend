import React from "react"

import Book1Image from 'images/book1.png'
import Book2Image from 'images/book2.png'
import Book3Image from 'images/book3.png'
import Book4Image from 'images/book4.png'
import CourseCard from "./card"
import { Row, Col } from "antd"
import { Link } from "gatsby"

const courses = [
    {
        title: 'AWS 入門書',
        imageUrl: Book1Image,
        author: { name: '金沢 たかし' },
        price: 2980
    },
    {
        title: 'Linux 実践入門',
        imageUrl: Book2Image,
        author: { name: '山下 智己' },
        price: 3480
    },
    {
        title: 'はじめての簿記',
        imageUrl: Book3Image,
        author: { name: '池上 拓' },
        price: 1980
    },
    {
        title: 'React/Redux実践',
        imageUrl: Book4Image,
        author: { name: '渡辺 秀作' },
        price: 2180
    },
]

const CourseCardList = () => (
    <Row type="flex" align="middle" gutter={16} >
        {courses.map(c => {
            return (
                <Col xs={12} sm={8} md={6} lg={6} xl={6} style={{ marginTop: '20px' }} key={c.title}>
                    <Link to="/detail">
                        <div style={{ width: '100%', margin: '0 auto' }}>
                            <CourseCard imageUrl={c.imageUrl} title={c.title} author={c.author} price={c.price} />
                        </div>
                    </Link>
                </Col>
            )
        })}
    </Row>
)

export default CourseCardList