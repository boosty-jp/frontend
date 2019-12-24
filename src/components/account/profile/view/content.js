import React from "react"
import { Row, Col } from 'antd';
import LearningCourses from "components/course/learnings-partial";
import TopCategories from "components/account/profile/view/top-category";
import PublishedContents from "./published-contents";
import DraftedContents from "./drafted-contents";
import TopSkills from "./skills";

const ProfileContents = () => (
    <>
        <LearningCourses />
        <DraftedContents />
        <PublishedContents />
    </>
    // <Row gutter={[16, 16]}>
    //     <Col xs={24} sm={24} md={14} lg={16} xl={18}>
    //         <LearningCourses />
    //         <DraftedContents />
    //         <PublishedContents />
    //     </Col>
    //     <Col xs={24} sm={24} md={10} lg={8} xl={6}>
    //         <TopSkills />
    //         <TopCategories />
    //     </Col>
    // </Row>
)

export default ProfileContents