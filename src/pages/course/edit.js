import React from 'react';
import { connect } from 'react-redux'
import withLocation from "components/wrapper/location";
import { Icon, Spin } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorResult from "components/error/result";
import { setBase, clearBase } from 'modules/course/edit/base'
import { setSections, clearSections } from 'modules/course/edit/sections'
import { clearSection } from 'modules/course/edit/section'
import CourseEdit from 'components/course/editor'

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

        articles {
          id
          title
          number
        }
      }
    }
  }
`;

const CourseEditPageComponent = (props) => {
    const { id } = props.search
    if (id) {
        return (
            <Query
                query={GET_COURSE}
                fetchPolicy='network-only'
                variables={{ courseId: id }}
                onCompleted={(data) => {
                    props.setBase(data.course)
                    props.setSections(data.course.sections)
                }}
            >
                {({ loading, error }) => {
                    if (loading) {
                        return (
                            <Spin spinning={loading} tip="ロード中です" indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
                                <CourseEdit />
                            </Spin>
                        )
                    }

                    if (error) return <ErrorResult />
                    return <CourseEdit />
                }}
            </Query>
        )
    } else {
        return <CourseEdit />
    }

}


const mapStateToProps = state => ({
    courseCount: state.courseEditSections.sections.length,
})

const mapDispatchToProps = dispatch => ({
    setBase: (course) => dispatch(setBase(course)),
    setSections: (sections) => dispatch(setSections(sections)),
    clearBase: () => dispatch(clearBase()),
    clearSection: () => dispatch(clearSection()),
    clearSections: () => dispatch(clearSections()),
})

const CourseEditPage = connect(mapStateToProps, mapDispatchToProps)(CourseEditPageComponent)
export default withLocation(CourseEditPage)