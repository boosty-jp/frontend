import React from 'react';
import { connect } from 'react-redux'
import { Row, Col, Typography } from 'antd'
import BookCoverImage from 'components/image/cover';
import { Link } from 'gatsby'
import { createBookEditLink } from 'utils/link-generator';

const { Paragraph } = Typography;

class BookEditMenuHeaderComponent extends React.Component {

    confirmMove = e => {
        if (!this.props.saved) {
            if (typeof window) {
                if (!window.confirm("内容を保存せずにページ移動しますか？")) {
                    e.preventDefault();
                }
            }
        }
    }

    render() {
        return (
            <Link to={createBookEditLink(this.props.id)} onClick={this.confirmMove}>
                <Row type="flex" align="top" gutter={8} style={{ marginBottom: '12px' }}>
                    <Col span={4} style={{ textAlign: 'center' }}>
                        <BookCoverImage imageUrl={this.props.imageUrl} boxShadow="2px 2px 4px #cdd0d4, -2px -2px 4px #ffffff" />
                    </Col>
                    <Col span={20} style={{ textAlign: 'left' }}>
                        <Paragraph ellipsis={{ rows: 2 }} style={{ fontWeight: '500', color: 'black', fontSize: '18px' }}>
                            {this.props.title}
                        </Paragraph>
                    </Col>
                </Row>
            </Link >
        );
    }
}

const mapStateToProps = state => ({
    id: state.bookEdit.id,
    title: state.bookEdit.title,
    imageUrl: state.bookEdit.imageUrl,
    author: state.bookEdit.author,
    saved: state.pageEdit.saved
})

const BookEditMenuHeader = connect(mapStateToProps)(BookEditMenuHeaderComponent);
export default BookEditMenuHeader