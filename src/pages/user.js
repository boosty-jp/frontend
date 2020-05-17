import React from "react"
import withLocation from "components/wrapper/location";
import UserSEO from "components/seo/user-seo"
import { Row, Col } from 'antd'
import UserProfileHeader from "components/user/header";
import CreatedBookList from "components/book/view/list/created-list";
import VerticalLayout from "components/layout/vertical";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const UserProfilePage = (props) => {
    const { id } = props.search
    if (!id) navigate("/404");
    return (

        <VerticalLayout>
            <UserSEO />
            <Row style={{ padding: '20px' }} gutter={20} style={{ margin: '20px auto', maxWidth: '800px' }}>
                <Col xs={24} sm={24} style={{ marginBottom: '20px' }}>
                    {/* <UserProfileHeader selfSearch={false} id={id} /> */}
                </Col>
                <Col xs={24} sm={24} >
                    <div style={{ marginBottom: '20px' }}>
                        <CreatedBookList id={id} />
                    </div>
                </Col>
            </Row>
        </VerticalLayout>
    )
}
export default withLocation(UserProfilePage)