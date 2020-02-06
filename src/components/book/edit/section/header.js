import React from 'react';
import { Statistic, Affix, Row, Col, Divider, Button, Icon } from 'antd'
import AddSectionModal from './add-section';

const cardStyle = {
    backgroundColor: 'white',
    width: '100%',
    padding: '20px 0px 0px 0px',
    fontColor: 'black',
}

const BookEditSectionHeader = () => {
    return (
        <Affix offsetTop={0}>
            <div style={cardStyle}>
                <Row align="middle" type="flex" gutter={16}>
                    <Col span={14} style={{ textAlign: 'center' }}>
                        <AddSectionModal />
                        <Button ><Icon type="retweet" rotate={90} />並び替え</Button>
                    </Col>
                    <Col span={5} style={{ textAlign: 'right' }}>
                        <Statistic title="セクション数" value={8} />
                    </Col>
                    <Col span={5} style={{ textAlign: 'right' }}>
                        <Statistic title="ページ数" value={126} />
                    </Col>
                </Row>
                <Divider />
            </div>
        </Affix>
    );

}
export default BookEditSectionHeader;