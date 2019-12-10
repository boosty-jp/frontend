import React from "react"
import { Row, Col } from 'antd';
import LearningCurriculums from "components/course/learnings-partial";
import TopCategories from "components/user/profile/view/top-category";
import CreatedContents from "./created-contents";
import CompletedContents from "./completed-contents";
import TopSkills from "./skills";

const ProfileContents = () => (
    <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={14} lg={16} xl={18}>
            <CreatedContents />
            <CompletedContents />
            <LearningCurriculums />
        </Col>
        <Col xs={24} sm={24} md={10} lg={8} xl={6}>
            <TopSkills />
            <TopCategories />
        </Col>
    </Row>
)

export default ProfileContents