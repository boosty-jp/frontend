import React from 'react';
import { connect } from 'react-redux'
import { Empty } from 'antd'
import SectionForm from 'components/course/editor/add-section-form';
import SectionSortList from 'components/course/editor/section-sort-list';

const EditForm = ({ sections }) => {
    return (
        <>
            {sections.length === 0 ?
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="セクションを追加してください" />
                :
                <SectionSortList sections={sections} />
            }
            <SectionForm />
        </>
    );
}

const mapStateToProps = state => ({
    sections: state.courseEditSections.sections,
})

const CourseEditSectionsForm = connect(mapStateToProps)(EditForm)
export default CourseEditSectionsForm