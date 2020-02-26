import React from "react"
import BookInfo from "./table-info";
import PcBookHeaderCard from './header/pc'
import MobileBookHeaderCard from './header/mobile'
import BookSections from './sections'
import BookSalesPointCard from "./sales-point";
import BookAuthor from "./author";
import BookTargetUserCard from "./target-user";
import { Row, Col, Affix } from 'antd'
import BookCardList from "components/book/view/list/card-list"

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
                    <p style={{ fontWeight: 'bold', color: 'black', fontSize: '22px', textAlign: 'center', margin: '30px auto 10px auto' }}>
                        おすすめの教材
            </p>
                    <BookCardList />
                </Col>
            </Row>
        </>
    )
}

export default BookDetailCard