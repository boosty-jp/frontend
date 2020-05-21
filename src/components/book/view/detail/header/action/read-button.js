import React from "react"
import { connect } from 'react-redux'
import { Button } from 'antd';
import { Link } from "gatsby";
import { createPageViewLink } from 'utils/link-generator';

const ReadButtonComponent = (props) => {
    let buttonText = "はじめから読む"
    let pageId = props.sections[0].pages[0].id;

    if (props.lastViewedPageId) {
        buttonText = "続きから読む";
        pageId = props.lastViewedPageId;
    }

    return (
        <Link to={createPageViewLink(pageId, props.bookId)}>
            <Button
                type="primary"
                shape="round"
                size="large"
                block
            >{buttonText}</Button >
            {props.lastViewedPageId &&
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <Link to={createPageViewLink(props.sections[0].pages[0].id, props.bookId)}>はじめから読む</Link>
                </div>
            }
        </Link>
    )
}

const mapStateToProps = state => ({
    bookId: state.bookView.id,
    sections: state.bookView.sections,
    lastViewedPageId: state.bookView.lastViewedPageId,
})

const ReadButton = connect(mapStateToProps)(ReadButtonComponent);
export default ReadButton