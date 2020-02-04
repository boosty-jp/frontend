import React from "react"
import BookInfo from "./table-info";
import BookHeaderCard from './header'
import BookSections from './sections'
import BookSalesPointCard from "./sales-point";
import BookAuthor from "./author";
import BookTargetUserCard from "./target-user";
import { Row, Col } from 'antd'

const BookDetailCard = ({ imageUrl, title, author, price }) => {
    return (
        <>
            <BookHeaderCard imageUrl={imageUrl} title={title} author={author} price={price} />
            <Row type="flex" gutter={32} style={{ paddingBottom: '30px' }}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginTop: '30px' }}>
                    <BookTargetUserCard />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginTop: '30px' }}>
                    <BookSalesPointCard />
                </Col>
            </Row>
            <BookSections />
            <BookInfo />
            <BookAuthor />
        </>
    )
}

export default BookDetailCard