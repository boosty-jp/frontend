import React from "react"
import { Row, Col, Badge, Button, Tooltip } from 'antd';
import SimpleBorderedShadowButton from "components/button/simple-border-shadow";

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontColor: 'black',
}

const BookStatusCard = () => {
    return (
        <div style={cardStyle}>
            <Row type="flex" align="middle" gutter={16} >
                <Col span={10} style={{ textAlign: 'left' }} >
                    <span style={{ color: 'black', marginRight: '10px' }}>ステータス:</span><span><Badge status="default" />下書き</span>
                </Col>
                <Col span={14} style={{ textAlign: 'right' }} >
                    <SimpleBorderedShadowButton text="公開する" color="#1890ff" style={{ marginRight: '10px' }} />
                    <Tooltip title="プレビューを見る">
                        <Button shape="circle" icon="eye" style={{ boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }} />
                    </Tooltip>
                </Col>
            </Row>
        </div>
    )
}

export default BookStatusCard