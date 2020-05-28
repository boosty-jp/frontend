import React from 'react';
import { connect } from 'react-redux'
import * as tocbot from 'tocbot';
import { Divider, Typography, Row, Col, Affix, Button, Alert } from 'antd';
import RelatedPages from './related-pages';
import MarkdownRender from 'utils/markdown/markdown-renderer'
import Helmet from "react-helmet"
import { TwitterOutlined, EditOutlined } from '@ant-design/icons';
import PageLikeButton from './like-button';
import { TwitterShareButton, } from 'react-share'
import { createPageViewUrl, createPageEditLink } from 'utils/link-generator'
import { Link } from '@reach/router';

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
class PageViewContentComponent extends React.Component {
    componentDidMount() {
        tocbot.init({
            tocSelector: '.js-toc',
            contentSelector: '.js-toc-content',
            headingSelector: 'h1, h2, h3',
            hasInnerContainers: false,
            collapseDepth: 3,
            scrollSmooth: true,
            scrollSmoothDuration: 420,
            scrollEndCallback: function (e) { },
            headingsOffset: 1,
            throttleTimeout: 50,
            positionFixedSelector: null,
            positionFixedClass: 'is-position-fixed',
            fixedSidebarOffset: 'auto',
            includeHtml: false,
            onClick: false,
            orderedList: false,
            scrollContainer: null,
            skipRendering: false,
            extraLinkClasses: '',
            activeLinkClass: 'is-active-link',
            listClass: 'toc-list',
            extraListClasses: '',
            isCollapsedClass: 'is-collapsed',
            collapsibleClass: 'is-collapsible',
        });
    }
    componentDidUpdate() {
        tocbot.refresh();
    }

    render() {
        const title = this.props.title ? this.props.title : "タイトル未設定"
        return (
            <Row>
                <Col xs={24} sm={24} md={24} lg={20} xl={19} xxl={19} style={{ padding: '20px' }}>
                    <div style={cardStyle}>
                        <div>
                            <Helmet>
                                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" media="print" onload="this.media='all'" />
                            </Helmet>
                            <div style={{ backgroundColor: 'white', margin: '0 auto', wordBreak: 'break-all' }}>
                                {(this.props.status === 'draft' || this.props.state === 'suspend') &&
                                    <Alert
                                        showIcon
                                        type="info"
                                        style={{ marginBottom: '20px' }}
                                        message="プレビューモードです。※まだ公開されていません"
                                        closeText={<Link to={createPageEditLink(this.props.pageId, this.props.bookId)}><EditOutlined style={{ marginRight: '4px' }} />編集する</Link>}
                                    />
                                }
                                <Title level={1} style={{ fontWeight: '500' }}>{title}</Title>
                                <Divider style={{ margin: '8px 0px 24px 0px' }} />
                                <div dangerouslySetInnerHTML={{ __html: MarkdownRender.render(this.props.text) }} id="toc" className="js-toc-content book-page-body" />
                            </div>
                            <Divider />
                            <RelatedPages />
                        </div>
                    </div>
                </Col>
                <Col xs={0} sm={0} md={0} lg={4} xl={5} xxl={5} >
                    <Affix offsetTop={60}>
                        {this.props.status === 'publish' &&
                            <>
                                <div style={{ marginBottom: '8px' }}>
                                    <PageLikeButton />
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <TwitterShareButton
                                        title={this.props.title}
                                        url={createPageViewUrl(this.props.pageId, this.props.bookId)}
                                    >
                                        <Button shape="circle" icon={<TwitterOutlined />} />
                                    </TwitterShareButton>
                                </div>
                            </>
                        }
                        <div className="js-toc" />
                    </Affix>
                </Col>
                {this.props.status === 'publish' &&
                    <Col xs={24} sm={24} md={24} lg={0}>
                        <div style={{ position: 'fixed', bottom: '26px', left: '20px' }}>
                            <TwitterShareButton
                                title={this.props.title}
                                url={createPageViewUrl(this.props.pageId, this.props.bookId)}
                            >
                                <Button shape="circle" icon={<TwitterOutlined />} style={{ marginRight: '8px', background: 'white', boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }} />
                            </TwitterShareButton>
                            <PageLikeButton style={{ boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }} />
                        </div>
                    </Col>
                }
            </Row>
        )
    }
}

const mapStateToProps = state => ({
    title: state.pageView.title,
    text: state.pageView.text,
    status: state.bookView.status,
})

const PageViewContent = connect(mapStateToProps)(PageViewContentComponent)
export default PageViewContent