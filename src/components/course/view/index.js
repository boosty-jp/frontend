import React from "react"
import { connect } from 'react-redux'
import { Progress, Rate, Typography, Tag, Divider, Alert } from 'antd';
import PageLoader from "components/loader/page";
import ErrorResult from "components/error/result";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { clearCourse, setCourse } from 'modules/course/view'
import ThumbnailImage from "components/image/thumbnail";
import AvatarLabel from "components/avatar/author-label";
import CourseDetailTabs from "./tabs";

const { Title, Paragraph } = Typography;

const GET_COURSE = gql`
  query Course($courseId: ID!) {
    course(courseId: $courseId) {
      id
      title
      imageUrl
      description
      status
      createDate
      updateDate

      tags {
        id
        name
      }

      sections {
        id
        number
        title

        contents {
          id
          title
          number
          skills {
            id
            name
            relatedCount
            level
          }
          learned
        }
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

      actionCount {
        likeCount
        learnedCount
      }

      accountAction {
        liked
        learned
      }

      learnStatus {
        progress
        status
      }
    }
  }
`;


class CourseContentComponent extends React.Component {
    constructor(props) {
        super(props);
        props.clearCourse();
    }

    render() {
        return (
            <Query
                query={GET_COURSE}
                variables={{ courseId: this.props.id }}
                onCompleted={(data) => {
                    this.props.setCourse(data.course);
                }}
            >
                {({ loading, error }) => {
                    if (loading) return <PageLoader />
                    if (error) return <ErrorResult />
                    return (
                        <>
                            <ThumbnailImage imageUrl={this.props.imageUrl} />
                            <div style={{ padding: '24px' }}>
                                <Typography>
                                    <Title>{this.props.title}</Title>
                                </Typography>
                                <div style={{ margin: '12px auto 12px 0px' }}>
                                    <AvatarLabel
                                        name={this.props.author.displayName}
                                        updateDate={this.props.updateDate}
                                        image={this.props.author.imageUrl}
                                    />
                                </div>
                                {this.props.status === 'draft' &&
                                    <Alert message="下書き中のコースです。作成者以外には閲覧できないようになっています。" type="warning" showIcon />
                                }
                                <div>
                                    {this.props.tags.map(t => {
                                        return (
                                            <Tag key={t.id}>{t.name}</Tag>
                                        )
                                    })}
                                </div>
                                <Typography style={{ marginTop: '12px' }}>
                                    <Paragraph>{this.props.description}</Paragraph>
                                </Typography>
                                {/* <CourseSections sections={this.props.sections} /> */}
                            </div>
                        </>
                    )
                }}
            </Query>
        )
    }
}

const mapStateToProps = state => ({
    title: state.courseView.title,
    imageUrl: state.courseView.imageUrl,
    description: state.courseView.description,
    tags: state.courseView.tags,
    status: state.courseView.status,
    sections: state.courseView.sections,
    author: state.courseView.author,
    updateDate: state.courseView.updateDate
})

const mapDispatchToProps = dispatch => ({
    clearCourse: () => dispatch(clearCourse()),
    setCourse: (course) => dispatch(setCourse(course)),
})

const CourseContent = connect(mapStateToProps, mapDispatchToProps)(CourseContentComponent)
export default CourseContent;