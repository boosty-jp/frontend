import React from "react"
import SEO from "components/seo"
import { Row, Col } from 'antd'
import UserProfileHeader from "components/user/header";
import CreatedBookList from "components/book/view/list/created-list";
import VerticalLayout from "components/layout/vertical";

const UserProfilePage = () => (
    <VerticalLayout>
        <SEO title="Home" />
        <Row style={{ padding: '20px' }} gutter={20} style={{ margin: '20px auto', maxWidth: '800px' }}>
            <Col xs={24} sm={24} style={{ marginBottom: '20px' }}>
                <UserProfileHeader selfSearch={true} />
            </Col>
            <Col xs={24} sm={24} >
                <div style={{ marginBottom: '20px' }}>
                    <CreatedBookList />
                </div>

            </Col>
        </Row>
    </VerticalLayout>
)

export default UserProfilePage