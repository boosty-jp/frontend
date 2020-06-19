import React from 'react';
import { connect } from 'react-redux'
import { Divider, Typography } from 'antd';
import MarkdownRender from 'utils/markdown/markdown-renderer'
import Helmet from "react-helmet"
import RelatedPages from 'components/book/edit/page/related-pages'

const { Title } = Typography;
const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '1rem',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px 10px',
    fontColor: 'black',
}

class PagePreviewContentComponent extends React.Component {
    render() {
        const title = this.props.title ? this.props.title : "タイトル未設定"
        return (
            <div style={cardStyle}>
                <div>
                    <Helmet>
                        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" media="print" onload="this.media='all'" />
                    </Helmet>
                    <div style={{ backgroundColor: 'white', margin: '0 auto', wordBreak: 'break-all' }}>
                        <Title level={1} style={{ fontWeight: '500' }}>{title}</Title>
                        <Divider style={{ margin: '8px 0px 24px 0px' }} />
                        <div dangerouslySetInnerHTML={{ __html: MarkdownRender.render(this.props.text) }} id="toc" className="js-toc-content book-page-body" />
                    </div>
                    <Divider />
                    <RelatedPages />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    title: state.pageEdit.title,
    text: state.pageEdit.text,
})

const PagePreviewContent = connect(mapStateToProps)(PagePreviewContentComponent)
export default PagePreviewContent