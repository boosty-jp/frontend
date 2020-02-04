import React from "react"
import { Row, Col, Statistic } from 'antd';
import BookCoverImage from 'components/image/cover'
import AuthorLabel from "components/avatar/author-label";
import PurchaseButton from "./purchase-button";
import { blue } from '@ant-design/colors';

const BookHeaderCard = ({ imageUrl, title, author, price }) => {
    return (
        <Row type="flex" align="top" gutter={8} style={{ marginTop: '8px' }}>
            <Col xs={10} sm={10} md={8} lg={6} xl={6} >
                <div style={{ margin: '0 auto', width: '100%', borderRadius: '0.5rem', overflow: 'hidden' }}>
                    <BookCoverImage imageUrl={imageUrl} />
                </div>
            </Col>
            <Col xs={14} sm={14} md={16} lg={18} xl={18} style={{ textAlign: 'left' }}>
                <div style={{ margin: '16px 12px 0px 12px' }}>
                    <span style={{ fontWeight: 'bold', color: 'black', fontSize: '22px' }}>
                        {title}
                    </span>
                    <div style={{ marginTop: '8px' }}>
                        <AuthorLabel name={author.name} />
                    </div>
                    <div style={{ marginTop: '12px' }}>
                        <Statistic value={price} suffix="円(税抜)" />
                    </div>
                    <div style={{ marginTop: '60px' }}>
                        <PurchaseButton color={blue[5]} />
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default BookHeaderCard