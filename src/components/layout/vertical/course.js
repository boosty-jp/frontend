import React from "react"
import { Layout } from 'antd';
import VerticalFooter from "./footer";
import HorizontalContentMenu from 'components/menu/horizontal-content'
import CourseActionButtonSider from "components/sider/buttons/course/action-buttons";
import CourseProgress from 'components/course/view/progress'

const { Content } = Layout;

class CourseLayout extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout >
                <div style={{ minHeight: '100vh' }}>
                    <HorizontalContentMenu />
                    <Content>
                        <CourseActionButtonSider onCourse={false} />
                        <div>
                            {this.props.children}
                        </div>
                    </Content>
                    <VerticalFooter />
                </div>
                <CourseProgress />
            </Layout>
        )
    }
}
export default CourseLayout;