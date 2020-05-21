import React from "react"
import { connect } from 'react-redux'
import { Alert } from 'antd';
import PurchaseButton from "components/book/view/detail/header/action/purchase";
import ReadButton from "./read-button";
import AddButton from "./add-button";

const BookViewActionButtonComponent = (props) => {
    if (props.mode === "preview") return <Alert message="プレビューモード" type="warning" showIcon />
    if (props.mode === "read") return <ReadButton />
    if (props.mode === "add") return <AddButton />
    return <PurchaseButton />;
}

const mapStateToProps = state => ({
    mode: state.bookView.mode,
})

const BookViewActionButton = connect(mapStateToProps)(BookViewActionButtonComponent);
export default BookViewActionButton