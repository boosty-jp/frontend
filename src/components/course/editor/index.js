import React from 'react';
import { connect } from 'react-redux'
import { Card, Icon, Tooltip } from 'antd';
import CourseEditHeader from 'components/course/editor/header'
import SectionsEditor from 'components/course/editor/sections';
import CourseEditLayout from 'components/layout/vertical/course-edit';

class CourseEditComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleBeforeUnload = this.handleBeforeUnload.bind(this);
    }

    componentWillMount() {
        window.addEventListener('beforeunload', this.handleBeforeUnload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }

    handleBeforeUnload(e) {
        e.preventDefault();
        e.returnValue = '記事を保存せずに閉じますか？';
    }

    render() {
        return (
            <CourseEditLayout>
                <Card
                    title="基本情報"
                    bordered={true}
                    style={{ maxWidth: '740px', width: '100%', margin: ' 20px auto', }}
                >
                    <CourseEditHeader />
                </Card>
                <Card
                    title="コース内容"
                    bordered={true}
                    style={{ maxWidth: '740px', width: '100%', margin: ' 20px auto' }}
                    extra={
                        <>
                            <span style={{ marginRight: '8px' }}>{this.props.courseCount} / 10</span>
                            <Tooltip title="1コースにつき10セクションまで作成できます">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </>
                    }
                >
                    <SectionsEditor />
                </Card>
            </CourseEditLayout>
        );
    }
}


const mapStateToProps = state => ({
    courseCount: state.courseEditSections.sections.length,
})

const CourseEdit = connect(mapStateToProps)(CourseEditComponent)
export default CourseEdit