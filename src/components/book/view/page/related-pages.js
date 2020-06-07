import React from 'react';
import { connect } from 'react-redux'
import { Row, Col, Typography } from 'antd';
import { Link } from 'gatsby';
import { createPageViewLink } from 'utils/link-generator';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '0.5rem',
    width: '100%',
    padding: '10px',
    fontColor: 'black',
}

const PageCard = ({ pageId, bookId, text }) => {
    return (
        <Link to={createPageViewLink(pageId, bookId)}>
            <div style={cardStyle}>
                {text}
            </div>
        </Link>
    )
}

const PreviousPageLink = ({ bookId, previousPage }) => {
    if (!previousPage) {
        return <></>
    }
    return (
        <PageCard
            pageId={previousPage.id}
            bookId={bookId}
            text={
                < Row gutter={8} type="flex" align="middle" >
                    <Col span={4} style={{ textAlign: 'left', fontSize: '18px', color: '#8c8c8c' }}>
                        <ArrowLeftOutlined />
                    </Col>
                    <Col span={20} style={{ textAlign: 'right', color: 'black', fontSize: '18px' }}>
                        <p style={{ color: '#8c8c8c', fontSize: '14px', marginBottom: '4px' }}>前へ</p>
                        <Paragraph ellipsis style={{ marginBottom: '0px' }}>{previousPage.title}</Paragraph>
                    </Col>
                </Row >
            }
        />
    )
}

const NextPageLink = ({ bookId, nextPage }) => {
    if (!nextPage) {
        return <></>
    }
    return (
        <PageCard
            pageId={nextPage.id}
            bookId={bookId}
            text={
                <Row gutter={8} type="flex" align="middle">
                    <Col span={20} style={{ textAlign: 'left', color: 'black', fontSize: '18px' }}>
                        <p style={{ color: '#8c8c8c', fontSize: '14px', marginBottom: '4px' }}>次へ</p>
                        <Paragraph ellipsis style={{ marginBottom: '0px' }}>{nextPage.title}</Paragraph>
                    </Col>
                    <Col span={4} style={{ textAlign: 'right', fontSize: '18px', color: '#8c8c8c' }}>
                        <ArrowRightOutlined />
                    </Col>
                </Row>
            }
        />
    )
}

class RelatedPagesComponent extends React.Component {

    render() {
        const currentIdx = this.props.pages.findIndex(page => page.id === this.props.currentId);
        let previousPage;
        let nextPage;
        if (currentIdx >= 0) {
            if (currentIdx > 0) {
                previousPage = this.props.pages[currentIdx - 1];
            }
            if (currentIdx < this.props.pages.length - 1) {
                nextPage = this.props.pages[currentIdx + 1];
            }
        }

        return (
            <Row gutter={16}>
                <Col xs={0} sm={12} md={12} lg={12} xl={12} style={{ marginTop: '20px' }}>
                    <PreviousPageLink previousPage={previousPage} bookId={this.props.bookId} />
                </Col>
                <Col xs={0} sm={12} md={12} lg={12} xl={12} style={{ marginTop: '20px' }}>
                    <NextPageLink nextPage={nextPage} bookId={this.props.bookId} />
                </Col>
                <Col xs={24} sm={0} md={0} lg={0} xl={0} style={{ marginTop: '20px' }}>
                    <NextPageLink nextPage={nextPage} bookId={this.props.bookId} />
                </Col>
                <Col xs={24} sm={0} md={0} lg={0} xl={0} style={{ marginTop: '20px' }}>
                    <PreviousPageLink previousPage={previousPage} bookId={this.props.bookId} />
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = state => ({
    currentId: state.pageView.id,
    bookId: state.bookView.id,
    pages: state.bookView.sections.flatMap(s => s.pages.map(p => { return { id: p.id, title: p.title } })),
    sections: state.bookView.sections,
})

const RelatedPages = connect(mapStateToProps)(RelatedPagesComponent)
export default RelatedPages