import React from "react"
import { connect } from 'react-redux'
import { Button, Modal, Tooltip, Typography, Divider } from 'antd';

const { Title } = Typography;

class PagePreviewComponent extends React.Component {
    state = {
        preview: false,
    };

    render() {
        return (
            <>
                <Tooltip placement="left" title="プレビュー">
                    <Button shape="circle" icon="eye" onClick={() => this.setState({ preview: true })} />
                </Tooltip>
                <Modal
                    title="プレビュー"
                    visible={this.state.preview}
                    onCancel={() => this.setState({ preview: false })}
                    footer={[<Button key="back" onClick={() => this.setState({ preview: false })}>閉じる</Button>]}
                    width={740}
                    style={{ top: 80 }}
                >
                    <Typography>
                        <Title>{this.props.title}</Title>
                    </Typography>
                    <Divider />
                    {this.props.text}
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => ({
    title: state.pageEdit.title,
    text: state.pageEdit.text,
})

const PagePreview = connect(mapStateToProps)(PagePreviewComponent)
export default PagePreview;