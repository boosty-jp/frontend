import React from "react"
import { Statistic } from 'antd';
import { connect } from 'react-redux'
import BookCoverImage from 'components/image/cover'
import AuthorLabel from "components/avatar/author-label";
import BookViewActionButton from "./action";

const cardStyle = {
    background: '#F7FAFF',
    boxShadow: '10px 10px 20px #a3a5a8, -10px -10px 20px #ffffff',
    borderRadius: '1rem',
    width: '100%',
    height: '100%',
    padding: '20px',
    fontColor: 'black',
}

const bookShadowStyle = {
    margin: '0 auto',
    width: '100%',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    background: '#F7FAFF',
    boxShadow: '6px 6px 12px #a3a5a8, -6px -6px 12px #ffffff',
}

const PcBookHeaderCardComponent = (props) => {
    return (
        <div style={cardStyle}>
            <div style={bookShadowStyle}>
                <BookCoverImage imageUrl={props.imageUrl} />
            </div>
            <div style={{ margin: '16px 12px 0px 12px' }}>
                <span style={{ fontWeight: '500', color: 'black', fontSize: '20px' }}>
                    {props.title}
                </span>
                <div style={{ marginTop: '8px' }}>
                    <AuthorLabel name={props.author.displayName} imageUrl={props.author.imageUrl} />
                </div>
                <div style={{ marginTop: '12px' }}>
                    <Statistic value={props.price} suffix="円" />
                </div>
                <div style={{ marginTop: '30px' }}>
                    <BookViewActionButton />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    title: state.bookView.title,
    imageUrl: state.bookView.imageUrl,
    price: state.bookView.price,
    author: state.bookView.author,
})

const PcBookHeaderCard = connect(mapStateToProps)(PcBookHeaderCardComponent);

export default PcBookHeaderCard