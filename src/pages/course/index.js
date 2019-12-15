import React, { useState, useEffect, useRef } from "react"
import CourseLayout from 'components/layout/vertical/course';
import ActionButtonSider from "components/sider/action-buttons";
import ArticleContent from 'components/article/view'

const CoursePage = () => {
    const [width, setWidth] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setWidth(ref.current.clientWidth)
    })

    let marginToMenu = '0px';
    if (width > 740) {
        marginToMenu = '30px'
    }

    return (
        <CourseLayout>
            <ActionButtonSider onCourse={true} />
            <div ref={ref}>
                <div style={{ background: '#fff', maxWidth: '740px', width: '100%', margin: marginToMenu + ' auto' }}>
                    <ArticleContent />
                </div>
            </div>
        </CourseLayout>
    );
}

export default CoursePage;