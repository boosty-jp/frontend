import React from "react"
import { connect } from 'react-redux'
import PurchaseButton from "components/book/view/detail/header/action/purchase";
import ReadButton from "./read-button";
import AddButton from "./add-button";
import { canDisplayPreviewMode } from "utils/preview-checker";
import { createBookEditLink } from "utils/link-generator"
import PreviewAlert from "../../preview-alert";

const BookViewActionButtonComponent = (props) => {
    const canPreview = canDisplayPreviewMode(props.status, props.author);
    if (canPreview) return <PreviewAlert link={createBookEditLink(props.id)} />

    if (props.mode === "read") return <ReadButton />
    if (props.mode === "add") return <AddButton />
    return <PurchaseButton />;
}

const mapStateToProps = state => ({
    id: state.bookView.id,
    mode: state.bookView.mode,
    status: state.bookView.status,
    author: state.bookView.author,
})

const BookViewActionButton = connect(mapStateToProps)(BookViewActionButtonComponent);
export default BookViewActionButton