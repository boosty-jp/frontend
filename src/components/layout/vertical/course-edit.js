import React from "react"
import { Tooltip, Affix, Button, Layout } from 'antd';
import VerticalFooter from "./footer";
import CourseEditMenu from "components/menu/horizontal-course-edit";
import CoursePreview from 'components/course/editor/preview'

const { Content } = Layout;

class CourseEditLayout extends React.Component {

    render() {
        return (
            <Layout>
                <CourseEditMenu />
                <Content>
                    <div >
                        {this.props.children}
                    </div>
                </Content>
                <Affix offsetBottom={20} style={{ width: '200px', margin: '0 0px 0 auto' }}>
                    <div style={{ textAlign: 'right', padding: '20px' }}>
                        <div>
                            <CoursePreview />
                        </div>
                        <div style={{ marginTop: '8px' }}>
                            <Tooltip placement="left" title="書き方のヒント">
                                <Button shape="circle" icon="bulb" />
                            </Tooltip>
                        </div>
                    </div>
                </Affix>
                <VerticalFooter />
            </Layout >
        )
    }
}
export default CourseEditLayout;