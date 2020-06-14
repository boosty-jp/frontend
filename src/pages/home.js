import React from "react"

import { Row, Col } from 'antd'
import SEO from "components/seo/seo"
import VerticalLayout from "components/layout/vertical"
import RecentViewedBookList from "components/book/view/list/recent-view-list"
import NewSaleBookList from "components/book/view/list/new/top"
import FamousSaleBookList from "components/book/view/list/famous/top-sale-list"
import FamousFreeBookList from "components/book/view/list/famous/top-free-sale-list"
import NotificationList from "components/notification/list"
import LanguageIconsComponent from "components/landing/icons"
import Helmet from "react-helmet"
import CreatorSalesBanner from "components/landing/creator/sale-banner"

const boardStyle = {
    background: "white",
    borderRadius: "0.5rem",
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    width: '100%',
    fontColor: 'black',
}

const HomePage = () => (
    <VerticalLayout activeMenuKey="home">
        <SEO title="ホーム" />
        <div style={{ margin: '0 auto', maxWidth: '900px', padding: '20px 0px' }}>
            <LanguageIconsComponent />
        </div>
        <div style={{ margin: '0 auto', maxWidth: '1200px' }}>
            <Row gutter={20} style={{ padding: '20px' }}>
                <Col xs={24} sm={24} md={24} lg={18} xl={17} xxl={18} style={{ marginBottom: '20px' }}>
                    <RecentViewedBookList />
                    {/* <div style={{ marginBottom: "30px" }}>
                        <FamousSaleBookList />
                    </div>
                    <div style={{ marginBottom: "30px" }}>
                        <FamousFreeBookList />
                    </div> */}
                    <div style={{ marginBottom: "30px" }}>
                        <NewSaleBookList />
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={6} xl={7} xxl={6}>
                    <div style={{ width: "100%" }}>
                        <div style={{ marginBottom: '20px' }}>
                            <CreatorSalesBanner />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <NotificationList />
                        </div>
                        <div style={boardStyle}>
                            <a className="twitter-timeline" href="https://twitter.com/boosty_official?ref_src=twsrc%5Etfw" data-height="500">Tweets by boosty_official</a>
                            <Helmet><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></Helmet>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </VerticalLayout>
)

export default HomePage