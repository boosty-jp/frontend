import React from "react"
import { connect } from 'react-redux'
import BookPublishButton from 'components/book/edit/status/publish-button'
import BookSuspendButton from 'components/book/edit/status/suspend-button'

const StatusButtonComponent = (props) => {
    if (props.status === "") return <></>
    if (props.status === 'draft' || props.status === 'suspend') return <BookPublishButton id={props.id} />

    if (props.status === 'publish') return <BookSuspendButton id={props.id} />
}

const mapStateToProps = state => ({
    id: state.bookEdit.id,
    status: state.bookEdit.status
})

const StatusButton = connect(mapStateToProps)(StatusButtonComponent)
export default StatusButton