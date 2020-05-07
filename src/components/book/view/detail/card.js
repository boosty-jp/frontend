import React from "react"
import BookInfo from "./table-info";
import PcBookHeaderCard from './header/pc'
import MobileBookHeaderCard from './header/mobile'
import BookSections from './sections'
import BookSalesPointCard from "./sales-point";
import BookAuthor from "./author";
import BookTargetUserCard from "./target-user";
import { Row, Col, Affix } from 'antd'
import FamousSaleBookList from "components/book/view/list/famous/top-sale-list"
import FamousFreeBookList from "components/book/view/list/famous/top-free-sale-list"

const BookDetailCard = () => {
    return (
        <>
            <Row gutter={32} style={{ paddingBottom: '30px' }}>
                <Col xs={0} sm={0} md={8} lg={8} xl={8} style={{ marginTop: '30px' }}>
                    <Affix offsetTop={10}>
                        <PcBookHeaderCard />
                    </Affix>
                </Col>
                <Col xs={24} sm={24} md={0} lg={0} xl={0} style={{ marginTop: '30px' }}>
                    <MobileBookHeaderCard />
                </Col>
                <Col xs={24} sm={24} md={16} lg={16} xl={16} style={{ marginTop: '30px' }}>
                    <BookTargetUserCard />
                    <BookSalesPointCard />
                    <BookSections />
                    <BookInfo />
                    <BookAuthor />
                    <p style={{ fontWeight: 'bold', color: 'black', fontSize: '22px', textAlign: 'center', margin: '50px auto 10px auto' }}>
                        - おすすめ -
            </p>
                    <div style={{ marginTop: '20px' }}>
                        <FamousSaleBookList />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <FamousFreeBookList />
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default BookDetailCard