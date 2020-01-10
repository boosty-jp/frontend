import React from "react"
import { connect } from 'react-redux'
import { message, Layout, Button, Row, Col, Affix } from 'antd';
import Logo from "components/logo";
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { createTestLink } from "utils/link-generator";
import { getErrorMessage } from "utils/error-handle";
import { getTestError } from "utils/test-validator";
import { makeTestRequest } from "utils/request-converter";
const { Header } = Layout;

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const DRAFT_TEST = gql`
mutation DraftTest($testInput: TestInput!){
  draftTest(test: $testInput) {
      id
  }
}
`;

const PUBLISH_TEST = gql`
mutation PublishTest($testInput: TestInput!){
  publishTest(test: $testInput){
      id
  }
}
`;

class EditMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            draftLoading: false,
            publishLoading: false,
        }
    }

    draft = async () => {
        this.setState({ draftLoading: true })
        try {
            const request = this.makeRequest();
            const { data } = await this.props.client.mutate({
                mutation: DRAFT_TEST,
                variables: {
                    testInput: request
                }
            });

            message.success("下書き保存しました", 7)
            // navigate(createTestLink(data.draftTest.id))
        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }
        this.setState({ draftLoading: false })
    }

    publish = async () => {
        this.setState({ publishLoading: true })
        try {
            const request = this.makeRequest();
            const { data } = await this.props.client.mutate({
                mutation: PUBLISH_TEST,
                variables: {
                    testInput: request
                }
            });

            message.success("公開しました", 7)
            navigate(createTestLink(data.publishTest.id))
        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }
        this.setState({ publishLoading: false })
    }

    makeRequest = () => {
        const error = getTestError(this.props.title, this.props.description, this.props.questions);
        if (error.status === "error") {
            throw new Error('エラーの項目を確認してください');
        }
        return makeTestRequest(this.props.id, this.props.title, this.props.description, this.props.referenceCourseId, this.props.questions);
    }

    validate = () => {

    }

    render() {
        return (
            <Affix offsetTop={0}>
                <Header style={{ background: '#fff', padding: '0px 8px' }}>
                    <div style={{ maxWidth: '740px', width: '100%', margin: '0 auto' }}>
                        <Row>
                            <Col span={11} style={{ textAlign: 'left' }}>
                                <Logo />
                            </Col>
                            <Col span={13} style={{ textAlign: 'right' }}>
                                <Button
                                    style={{ marginLeft: '12px' }}
                                    loading={this.state.draftLoading}
                                    disabled={this.state.publishLoading}
                                    onClick={this.draft}
                                >
                                    下書き
                                </Button>
                                <Button
                                    type="primary"
                                    style={{ marginLeft: '12px' }}
                                    loading={this.state.publishLoading}
                                    disabled={this.state.draftLoading}
                                    onClick={this.publish}
                                >
                                    公開
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Header >
            </Affix>
        )
    }
}


const mapStateToProps = state => ({
    id: state.testEditBase.id,
    title: state.testEditBase.title,
    description: state.testEditBase.description,
    referenceCourseId: state.testEditBase.referenceCourse.id,
    questions: state.testEditQuestions.questions,
})

const TestEditMenu = connect(mapStateToProps)(EditMenu)

export default withApollo(TestEditMenu)