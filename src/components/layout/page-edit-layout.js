import React from "react"
import { Layout } from 'antd';
import PageEditMenu from "components/menu/page-edit-menu";
import PageCharctorCountAnchor from "components/book/edit/page/charactor-count-anchor";

const { Content } = Layout;

class PageEditLayout extends React.Component {

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <PageEditMenu bookId={this.props.bookId} />
                <Content style={{ backgroundColor: '#F7FAFF', paddingBottom: '50px' }}>
                    <div >
                        {this.props.children}
                    </div>
                    <PageCharctorCountAnchor />
                </Content>
            </Layout >
        )
    }
}
export default PageEditLayout;