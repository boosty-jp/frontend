import React from 'react';
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import BookCoverImage from 'components/image/cover';
import { Link } from 'gatsby'
import { createBookDetailLink } from 'utils/link-generator';

class BookViewMenuHeaderComponent extends React.Component {
    render() {
        return (
            <Row type="flex" align="middle" gutter={8} style={{ marginBottom: '12px' }}>
                <Col span={4} style={{ textAlign: 'center' }}>
                    <Link to={createBookDetailLink(this.props.id)}>
                        <BookCoverImage imageUrl={this.props.imageUrl} boxShadow="2px 2px 4px #cdd0d4, -2px -2px 4px #ffffff" />
                    </Link>
                </Col>
                <Col span={20} style={{ textAlign: 'center' }}>
                    <span style={{ fontWeight: '500', color: 'black', fontSize: '18px' }}>
                        {this.props.title}
                    </span>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    id: state.bookView.id,
    title: state.bookView.title,
    imageUrl: state.bookView.imageUrl
})

const BookViewMenuHeader = connect(mapStateToProps)(BookViewMenuHeaderComponent);
export default BookViewMenuHeader