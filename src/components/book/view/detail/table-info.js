import React from "react"
import { connect } from 'react-redux'
import { Descriptions } from 'antd';
import Linkify from 'react-linkify';
const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontSize: 'bold',
    fontColor: 'black',
}

const componentDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank">
        {text}
    </a>
);



const BookInfoComponent = (props) => {
    return (
        <div style={{ marginTop: '20px', ...cardStyle }}>
            <p style={{ fontWeight: 'bold', color: 'black', fontSize: '22px', textAlign: 'center', marginBottom: '40px' }}>
                概要
            </p>
            <Descriptions
                bordered
                layout="vertical"
                style={{ borderRadius: '10rem' }}
            >
                <Descriptions.Item label="更新日" >{props.updateDate}</Descriptions.Item>
                <Descriptions.Item label="セクション数">{props.sections.length}</Descriptions.Item>
                <Descriptions.Item label="ページ数">{props.sections.reduce((prev, x) => { return prev + x.pages.length }, 0)}</Descriptions.Item>
                <Descriptions.Item label="説明" span={3} style={{ whiteSpace: 'pre-wrap' }}>
                    <Linkify componentDecorator={componentDecorator}>
                        {props.description}
                    </Linkify>
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

const mapStateToProps = state => ({
    sections: state.bookView.sections,
    updateDate: state.bookView.updateDate,
    description: state.bookView.description,
})

const BookInfo = connect(mapStateToProps)(BookInfoComponent);
export default BookInfo