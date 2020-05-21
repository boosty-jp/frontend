import React from "react"
import { connect } from 'react-redux'
import { Statistic, Row, Col } from 'antd';
import BookCoverImage from 'components/image/cover'
import AuthorLabel from "components/avatar/author-label";
import BookViewActionButton from "./action";

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '0.5rem',
    width: '100%',
    padding: '20px',
    fontColor: 'black',
}

const imageShadowStyle = {
    margin: '0 auto',
    width: '100%',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '3px 3px 6px #cdd0d4, -3px -3px 6px #ffffff'
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
                            <AuthorLabel id={props.author.id} name={props.author.displayName} imageUrl={props.author.imageUrl} />
                        </div>
                        <div style={{ marginTop: '12px' }}>
                            <Statistic value={props.price} suffix="円" />
                        </div>
                        <div style={{ marginTop: '16px' }}>
                            <BookViewActionButton />
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