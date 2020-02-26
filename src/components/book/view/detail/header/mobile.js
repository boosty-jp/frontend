import React from "react"
import { connect } from 'react-redux'
import { Statistic, Row, Col } from 'antd';
import BookCoverImage from 'components/image/cover'
import AuthorLabel from "components/avatar/author-label";
import PurchaseButton from "components/book/view/detail/header/action/purchase";
import { blue } from '@ant-design/colors';

const cardStyle = {
    background: '#F7FAFF',
    boxShadow: '8px 8px 16px #a3a5a8, -8px -8px 16px #ffffff',
    borderRadius: '1rem',
    width: '100%',
    height: '100%',
    padding: '20px',
    fontColor: 'black',
}

const imageShadowStyle = {
    margin: '0 auto',
    width: '100%',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    background: '#F7FAFF',
    boxShadow: '6px 6px 12px #a3a5a8, -6px -6px 12px #ffffff',
}

const MobileBookHeaderCardComponent = (props) => {
    return (
        <div style={cardStyle}>
            <Row gutter={16}>
                <Col span={8}>
                    <div style={imageShadowStyle}>
                        <BookCoverImage imageUrl={props.imageUrl} />
                    </div>
                </Col>
                <Col span={16}>
                    <div style={{ margin: '0px 12px 0px 12px' }}>
                        <span style={{ fontWeight: '500', color: 'black', fontSize: '20px' }}>
                            {props.title}
                        </span>
                        <div style={{ marginTop: '8px' }}>
                            <AuthorLabel name={props.author.displayName} imageUrl={props.author.imageUrl} />
                        </div>
                        <div style={{ marginTop: '12px' }}>
                            <Statistic value={props.price} suffix="円" />
                        </div>
                        <div style={{ marginTop: '16px' }}>
                            <PurchaseButton color={blue[5]} />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = state => ({
    title: state.bookView.title,
    imageUrl: state.bookView.imageUrl,
    price: state.bookView.price,
    author: state.bookView.author,
})

const MobileBookHeaderCard = connect(mapStateToProps)(MobileBookHeaderCardComponent);

export default MobileBookHeaderCard