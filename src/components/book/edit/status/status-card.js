import React from "react"
import { Row, Col, Button, Tooltip } from 'antd';
import StatusButton from "./status-button";
import BookStatusDescription from "./status-description";

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontColor: 'black',
}

class BookStatusCard extends React.Component {
    render() {
        return (
            <div style={cardStyle}>
                <Row type="flex" align="middle" gutter={16} >
                    <Col span={10} style={{ textAlign: 'left' }} >
                        <BookStatusDescription />
                    </Col>
                    <Col span={14} style={{ textAlign: 'right' }} >
                        <StatusButton />
                        <Tooltip title="プレビューを見る">
                            <Button shape="circle" icon="file-search" style={{ boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }} />
                        </Tooltip>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default BookStatusCard