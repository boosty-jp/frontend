import React from 'react';
import { connect } from 'react-redux'
import { Divider, Typography } from 'antd';

const { Title } = Typography;
const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontColor: 'black',
}

class PageViewContentComponent extends React.Component {
    render() {
        const title = this.props.title ? this.props.title : "タイトル未設定"
        return (
            <div style={cardStyle}>
                <div style={{ backgroundColor: 'white', maxWidth: '700px', margin: '0 auto', padding: '20px', wordBreak: 'break-all' }}>
                    <Title level={1} >{title}</Title>
                    <Divider style={{ margin: '8px 0px 24px 0px' }} />
                    {this.props.text}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    title: state.pageView.title,
    titleError: state.pageView.error.title,
    text: state.pageView.text,
    blocks: state.pageView.blocks,
    previewMode: state.pageEdit.previewMode,
})

const PageViewContent = connect(mapStateToProps)(PageViewContentComponent)
export default PageViewContent