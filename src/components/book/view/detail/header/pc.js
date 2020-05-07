import React from "react"
import { Statistic } from 'antd';
import { connect } from 'react-redux'
import BookCoverImage from 'components/image/cover'
import AuthorLabel from "components/avatar/author-label";
import BookViewActionButton from "./action";

const bookShadowStyle = {
    margin: '0 auto',
    width: '100%',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '3px 3px 6px #cdd0d4, -3px -3px 6px #ffffff'
}
const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '0.5rem',
    width: '100%',
    padding: '20px',
    fontColor: 'black',
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