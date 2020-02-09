import React from 'react';
import { Statistic, Affix, Row, Col, Divider, Button, Icon } from 'antd'
import AddSectionModal from './add-section';
import { connect } from 'react-redux'

const cardStyle = {
    backgroundColor: 'white',
    width: '100%',
    padding: '20px 0px 0px 0px',
    fontColor: 'black',
}

const BookEditSectionHeaderComponent = (props) => {
    let pageCount = 0;
    if (props.sections.length > 0) {
        props.sections.forEach(s => {
            if (s.pages) {
                pageCount = pageCount + s.pages.length;
            }
        })
    }

    return (
        <Affix offsetTop={0}>
            <div style={cardStyle}>
                <Row align="middle" type="flex" gutter={16}>
                    <Col span={14} style={{ textAlign: 'center' }}>
                        <AddSectionModal id={props.id} />
                        <Button ><Icon type="retweet" rotate={90} />並び替え</Button>
                    </Col>
                    <Col span={5} style={{ textAlign: 'right' }}>
                        <Statistic title="セクション数" value={props.sections.length} />
                    </Col>
                    <Col span={5} style={{ textAlign: 'right' }}>
                        <Statistic title="ページ数" value={pageCount} />
                    </Col>
                </Row>
                <Divider />
            </div>
        </Affix>
    );
}

const mapStateToProps = state => ({
    sections: state.bookEdit.sections,
})

const BookEditSectionHeader = connect(mapStateToProps)(BookEditSectionHeaderComponent)
export default BookEditSectionHeader;