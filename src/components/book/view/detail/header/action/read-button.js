import React from "react"
import { connect } from 'react-redux'
import { Button } from 'antd';
import { Link } from "gatsby";
import { createPageViewLink } from 'utils/link-generator';

const ReadButtonComponent = (props) => {
    let buttonText = "はじめから読む"
    let pageId = props.sections[0].pages[0].id;

    if (props.recentReadPageId) {
        buttonText = <>続きから読む<br />{props.recentReadPageTitle}</>;
        pageId = props.recentReadPageId;
    }

    return (
        <Link to={createPageViewLink(pageId, props.bookId)}>
            <Button
                shape="round"
                style={{
                    borderColor: '#F7FAFF',
                    color: '#1890ff',
                    fontWeight: '500',
                    fontSize: '16px',
                    background: '#F7FAFF',
                    boxShadow: '5px 5px 10px #a3a5a8, -5px -5px 10px #ffffff',
                }}
                size="large"
                block
            >{buttonText}</Button >
        </Link>
    )
}

const mapStateToProps = state => ({
    bookId: state.bookView.id,
    sections: state.bookView.sections,
    recentReadPageId: state.bookView.recentReadPageId,
    recentReadPageTitle: state.bookView.recentReadPageTitle
})

const ReadButton = connect(mapStateToProps)(ReadButtonComponent);
export default ReadButton