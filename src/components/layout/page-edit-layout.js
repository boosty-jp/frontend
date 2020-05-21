import React from "react"
import { Layout } from 'antd';
import PageEditMenu from "components/menu/page-edit-menu";
import HorizontalFooter from 'components/layout/horizontal/footer'
import PageEditAnchorMenu from "components/book/edit/page/anchor";

const { Content } = Layout;

class PageEditLayout extends React.Component {

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <PageEditMenu bookId={this.props.bookId} />
                <Content style={{ backgroundColor: '#F7FAFF' }}>
                    <PageEditAnchorMenu />
                    <div >
                        {this.props.children}
                    </div>
                </Content>
                <HorizontalFooter />
            </Layout >
        )
    }
}
export default PageEditLayout;