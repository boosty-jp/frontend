import React from "react"
import { Typography, Row, Col, Alert, Button } from 'antd';
import { connect } from 'react-redux'
import AvatarLabel from "components/avatar/author-label";
import ThumbnailImage from "components/image/thumbnail";
import { Link } from "gatsby";
import { createCourseDetailLink } from "utils/link-generator";
import { answering } from "modules/test/view/answer"

const { Title } = Typography;

class TestStartCardComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ padding: '24px' }}>
                <Row type="flex" justify="space-around" align="middle" gutter={16}>
                    <Col span={12}>
                        <Typography>
                            <Title level={3}>{this.props.title}</Title>
                        </Typography>
                        {this.props.status === 'draft' &&
                            <Alert message="下書き中の記事です。作成者以外には閲覧できないようになっています。" type="warning" showIcon />
                        }
                        <div style={{ margin: '12px auto 12px 0px' }}>
                            <AvatarLabel
                                name={this.props.author.displayName}
                                updateDate={this.props.updateDate}
                                image={this.props.author.imageUrl}
                            />
                        </div>
                        <Button
                            type="primary"
                            shape="round"
                            style={{
                                marginTop: '40px',
                                boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
                            }}
                            icon='highlight'
                            block
                            onClick={this.props.answering}
                        >問題を解く</Button >
                    </Col>
                    <Col span={12} >
                        <Link to={createCourseDetailLink(this.props.referenceCourse.id)}>
                            <div style={{
                                background: '#fff',
                                width: '90%',
                                boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
                                borderRadius: '0.5rem',
                                overflow: 'hidden',
                                margin: 'auto'
                            }}>
                                <ThumbnailImage imageUrl={this.props.referenceCourse.imageUrl} />
                                <div style={{ padding: '10px' }}>
                                    <p style={{
                                        margin: '16px auto',
                                        color: 'black',
                                        fontSize: '18px',
                                        fontWeight: '600'
                                    }}>{this.props.referenceCourse.title}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    title: state.testView.title,
    description: state.testView.description,
    referenceCourse: state.testView.referenceCourse,
    status: state.testView.status,
    author: state.testView.author,
    updateDate: state.testView.updateDate
})

const mapDispatchToProps = dispatch => ({
    answering: () => dispatch(answering()),
})

const TestStartCard = connect(mapStateToProps, mapDispatchToProps)(TestStartCardComponent)
export default TestStartCard;