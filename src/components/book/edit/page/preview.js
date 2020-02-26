import React from "react"
import { connect } from 'react-redux'
import { Button, Tooltip } from 'antd';
import { togglePreview } from "modules/page/edit/index";

class PagePreviewComponent extends React.Component {
    render() {
        return (
            <>
                <Tooltip placement="left" title="プレビュー">
                    <Button
                        shape="circle"
                        icon="file-search"
                        type={this.props.previewMode ? 'primary' : 'default'}
                        style={{ boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }}
                        onClick={() => this.props.togglePreview()}
                    />
                </Tooltip>
            </>
        )
    }
}

const mapStateToProps = state => ({
    title: state.pageEdit.title,
    text: state.pageEdit.text,
    blocks: state.pageEdit.blocks,
    previewMode: state.pageEdit.previewMode,
})

const mapDispatchToProps = dispatch => ({
    togglePreview: () => dispatch(togglePreview()),
})

const PagePreview = connect(mapStateToProps, mapDispatchToProps)(PagePreviewComponent)
export default PagePreview;