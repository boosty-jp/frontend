import React from 'react';
import { Card } from 'antd';
import CourseEditHeader from 'components/course/editor/header'
import SectionsEditor from 'components/course/editor/sections';
import CourseEditLayout from 'components/layout/vertical/course-edit';

export default class CourseEditPage extends React.Component {
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
                >
                    <SectionsEditor />
                </Card>
            </CourseEditLayout>
        );
    }
}