import React from "react"
import { connect } from 'react-redux'
import { message, Layout, Button, Row, Col, Affix } from 'antd';
import Logo from "components/logo";
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { createCourseDetailLink } from "utils/link-generator";
import { getErrorMessage } from "utils/error-handle";
import { getDescriptionError, getTagsError, getSectionsError, getTitleError } from "utils/content-validator";
const { Header } = Layout;

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const DRAFT_COURSE = gql`
mutation DraftCourse($courseInput: CourseInput!){
  draftCourse(course: $courseInput) {
      id
  }
}
`;

const PUBLISH_COURSE = gql`
mutation PublishCourse($courseInput: CourseInput!){
  publishCourse(course: $courseInput){
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
                mutation: DRAFT_COURSE,
                variables: {
                    courseInput: request
                }
            });

            message.success("下書き保存しました", 7)
            navigate(createCourseDetailLink(data.draftCourse.id))
        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }
        this.setState({ draftLoading: false })
    }

    publish = async () => {
        if (!this.validCourse()) return;

        this.setState({ publishLoading: true })
        try {
            const request = this.makeRequest();
            const { data } = await this.props.client.mutate({
                mutation: PUBLISH_COURSE,
                variables: {
                    courseInput: request
                }
            });

            message.success("公開しました", 7)
            navigate(createCourseDetailLink(data.publishCourse.id))
        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }
        this.setState({ publishLoading: false })
    }

    makeRequest = () => {
        return {
            id: this.props.id,
            title: this.props.title,
            imageUrl: this.props.imageUrl,
            description: this.props.description,
            tagIds: this.props.tags.map(t => { return t.id }),
            sections: this.props.sections.map((s, s_idx) => {
                return {
                    title: s.title,
                    number: s_idx + 1,
                    articles: s.articles.map((a, a_idx) => {
                        return { articleId: a.id, number: a_idx + 1 }
                    })
                }
            }),
        }
    }

    validCourse = () => {
        const titleError = getTitleError(this.props.title);
        const descriptionError = getDescriptionError(this.props.description);
        const tagsError = getTagsError(this.props.tags);
        const sectionsError = getSectionsError(this.props.sections);

        if (titleError.message) {
            message.error(titleError.message, 7)
            return false;
        } else if (descriptionError.message) {
            message.error(descriptionError.message, 7)
            return false;
        } else if (tagsError.message) {
            message.error(tagsError.message, 7)
            return false;
        } else if (sectionsError.message) {
            message.error(sectionsError.message, 7)
            return false;
        }

        return true;
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
    id: state.courseEditBase.id,
    title: state.courseEditBase.title,
    tags: state.courseEditBase.tags,
    imageUrl: state.courseEditBase.imageUrl,
    description: state.courseEditBase.description,

    sections: state.courseEditSections.sections,
})

const CourseEditMenu = connect(mapStateToProps)(EditMenu)

export default withApollo(CourseEditMenu)