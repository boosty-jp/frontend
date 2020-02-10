import React from "react"
import { connect } from 'react-redux'
import { Badge } from 'antd';

const BookStatusDescriptionComponent = (props) => {
    let description = "下書き"
    let status = "default"
    if (props.status === 'publish') {
        description = "公開中"
        status = "processing"
    } else if (props.status === 'suspend') {
        description = "公開停止"
        status = "error"
    }
    return (
        <>
            <span style={{ color: 'black', marginRight: '10px' }}>ステータス:</span>
            <span><Badge status={status} />{description}</span>
        </>
    )
}

const mapStateToProps = state => ({
    status: state.bookEdit.status,
})

const BookStatusDescription = connect(mapStateToProps)(BookStatusDescriptionComponent)
export default BookStatusDescription