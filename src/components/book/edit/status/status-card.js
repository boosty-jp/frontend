import React from "react"
import { connect } from 'react-redux'
import { Row, Col, Button, Tooltip } from 'antd';
import StatusButton from "./status-button";
import BookStatusDescription from "./status-description";
import { FileSearchOutlined } from '@ant-design/icons'
import { Link } from 'gatsby';
import { createBookDetailPreviewLink } from 'utils/link-generator'


const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontColor: 'black',
}

class BookStatusCardComponent extends React.Component {
    render() {
        return (
            <div style={cardStyle}>
                <Row type="flex" align="middle" gutter={16} >
                    <Col span={10} style={{ textAlign: 'left' }} >
                        <BookStatusDescription />
                    </Col>
                    <Col span={14} style={{ textAlign: 'right' }} >
                        <Tooltip title="プレビューを見る">
                            <Link to={createBookDetailPreviewLink(this.props.id)}>
                                <Button
                                    shape="circle"
                                    icon={<FileSearchOutlined />}
                                    style={{ boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)', marginRight: '14px' }}
                                />
                            </Link>
                        </Tooltip>
                        <StatusButton />
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    id: state.bookEdit.id,
})

const BookStatusCard = connect(mapStateToProps)(BookStatusCardComponent)
export default BookStatusCard