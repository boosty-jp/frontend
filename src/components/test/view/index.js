import React from "react"
import { Typography, Row, Col, Alert, Button, Card } from 'antd';
import PageLoader from "components/loader/page";
import ErrorResult from "components/error/result";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux'
import { clearTest, setTest } from 'modules/test/view'
import AvatarLabel from "components/avatar/author-label";
import ThumbnailImage from "components/image/thumbnail";

const { Title } = Typography;
const { Meta } = Card;

const GET_TEST = gql`
  query Test($testId: ID!) {
    test(testId: $testId) {
      id
      title
      description
      status
      createDate
      updateDate

      referenceCourse {
        id
        title
        imageUrl
      }

      questions {
        id
        text
        type
        candidates
        showCount
     }

      author {
        id
        displayName
        imageUrl
        description
        url
        twitterId
        facebookId
      }
    }
  }
`;


class TestContentComponent extends React.Component {
    constructor(props) {
        super(props);
        props.clearTest();
    }

    render() {
        return (
            <Query
                query={GET_TEST}
                variables={{ testId: this.props.id }}
                onCompleted={(data) => {
                    this.props.setTest(data.test);
                }}
            >
                {({ loading, error }) => {
                    if (loading) return <PageLoader />
                    if (error) return <ErrorResult />
                    return (
                        <>
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
                                                marginTop: '30px',
                                                boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
                                            }}
                                            icon='thunderbolt'
                                            block
                                        >始める</Button >
                                    </Col>
                                    <Col span={12}>
                                        <div style={{
                                            background: '#fff',
                                            width: '90%',
                                            boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
                                            borderRadius: '0.5rem',
                                            overflow: 'hidden'
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
                                    </Col>
                                </Row>
                            </div>
                        </>
                    )
                }}
            </Query>
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
    setTest: (test) => dispatch(setTest(test)),
    clearTest: () => dispatch(clearTest()),
})

const TestContent = connect(mapStateToProps, mapDispatchToProps)(TestContentComponent)
export default TestContent;