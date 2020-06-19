import React from 'react';
import { connect } from 'react-redux'
import { Row, Col, Typography } from 'antd'
import BookCoverImage from 'components/image/cover';
import { Link } from 'gatsby'
import { createBookDetailLink, createBookSectionsEditLink } from 'utils/link-generator';
import { EditOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;
class BookViewMenuHeaderComponent extends React.Component {
    render() {
        return (
            <Row type="flex" align="top" gutter={8} style={{ marginBottom: '12px' }}>
                <Col span={4} style={{ textAlign: 'center' }}>
                    <Link to={createBookDetailLink(this.props.id)}>
                        <BookCoverImage imageUrl={this.props.imageUrl} boxShadow="2px 2px 4px #cdd0d4, -2px -2px 4px #ffffff" />
                    </Link>
                </Col>
                <Col span={20} style={{ textAlign: 'left' }}>
                    {this.props.status === 'draft' ?
                        <>
                            <Paragraph ellipsis={{ rows: 1 }} style={{ fontWeight: '500', color: 'black', fontSize: '18px', marginBottom: '2px' }}>
                                {this.props.title}
                            </Paragraph>
                            <Link to={createBookSectionsEditLink(this.props.id)}><EditOutlined style={{ marginRight: '4px' }} />編集する</Link>
                        </>
                        :
                        <Paragraph ellipsis={{ rows: 2 }} style={{ fontWeight: '500', color: 'black', fontSize: '18px' }}>
                            {this.props.title}
                        </Paragraph>
                    }
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    id: state.bookView.id,
    title: state.bookView.title,
    imageUrl: state.bookView.imageUrl,
    author: state.bookView.author,
    status: state.bookView.status,
})

const BookViewMenuHeader = connect(mapStateToProps)(BookViewMenuHeaderComponent);
export default BookViewMenuHeader