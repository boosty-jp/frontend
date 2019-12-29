import React, { useState, useEffect, useRef } from "react"
import { connect } from 'react-redux'
import CourseLayout from 'components/layout/vertical/course';
import withLocation from "components/wrapper/location";
import ContentProfileCard from 'components/user/content-profile-card'
import CourseContent from 'components/course/view'
import CourseDetailTabs from "components/course/view/tabs";


const CourseDetailPageComponent = (props) => {
    const { id } = props.search
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
            <div ref={ref}>
                <div style={{ background: '#fff', maxWidth: '740px', width: '100%', margin: marginToMenu + ' auto' }}>
                    <CourseContent id={id} />
                </div>
                <div style={{ background: '#fff', marginTop: '20px', maxWidth: '740px', width: '100%', margin: marginToMenu + ' auto' }}>
                    <CourseDetailTabs />
                </div>
                <div style={{ background: '#fff', maxWidth: '740px', width: '100%', margin: "20px auto", padding: '20px' }}>
                    <ContentProfileCard data={props.author} />
                </div>
            </div>
        </CourseLayout>
    );
}

const mapStateToProps = state => ({
    author: state.courseView.author,
})

const CourseDetailPage = connect(mapStateToProps)(CourseDetailPageComponent)
export default withLocation(CourseDetailPage)