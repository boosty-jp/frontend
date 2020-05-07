import React from "react"
import { connect } from 'react-redux'
import AvatarImage from 'components/avatar/image'
import { Row, Col } from 'antd';
import SnsLinks from "components/user/snsLink";

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontSize: 'bold',
    fontColor: 'black',
}

const BookAuthorComponent = (props) => {
    return (
        <div style={{ marginTop: '20px', ...cardStyle }}>
            <p style={{ fontWeight: 'bold', color: 'black', fontSize: '22px', textAlign: 'center', marginBottom: '30px' }}>
                著者情報
            </p>
            <Row type="flex" align="top" gutter={16}>
                <Col xs={8} sm={6} md={6} lg={6} xl={6} style={{ textAlign: 'center' }}>
                    <AvatarImage
                        size={80}
                        style={{ fontSize: '40px' }}
                        imageUrl={props.author.imageUrl}
                        displayName={props.author.displayName}
                    />
                </Col>
                <Col xs={16} sm={18} md={18} lg={18} xl={18} >
                    <p style={{ color: 'black', fontSize: '18px', marginBottom: '6px' }}>{props.author.displayName}</p>
                    <SnsLinks
                        twitterId={props.author.twitterId}
                        facebookId={props.author.facebookId}
                        url={props.author.url}
                    />
                    <p style={{ fontSize: '16px' }}>{props.author.description}</p>
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = state => ({
    author: state.bookView.author,
})

const BookAuthor = connect(mapStateToProps)(BookAuthorComponent);
export default BookAuthor