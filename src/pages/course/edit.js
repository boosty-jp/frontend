import React from 'react';
import CourseEditHeader from 'components/course/editor/header'
import SectionsEditor from 'components/course/editor/sections';
import CourseEditLayout from 'components/layout/vertical/course-edit';

export default class CourseEditPage extends React.Component {
    render() {
        return (
            <CourseEditLayout>
                <div style={{ background: '#fff', padding: '24px' }}>
                    <CourseEditHeader />
                </div>
                <div style={{ padding: '20px' }}>
                    <div style={{ background: '#fff', padding: '24px' }}>
                        <SectionsEditor />
                    </div>
                </div>
            </CourseEditLayout>
        );
    }
}