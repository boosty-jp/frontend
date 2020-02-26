import React from "react"
import { Layout, Affix } from 'antd';
import HorizontalFooter from 'components/layout/horizontal/footer'
import PageViewAnchorMenu from "components/book/view/page/anchor";
import GlobalMenu from "components/menu/global";
import PcBookViewMenu from 'components/book/view/page/menu/pc'
import MobileBookViewMenuComponent from 'components/book/view/page/menu/mobile'

const { Content } = Layout;

class PageViewLayout extends React.Component {
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Content style={{ backgroundColor: 'white' }}>
                    <GlobalMenu maxWidth={800} />
                    <PcBookViewMenu id={this.props.id} bookId={this.props.bookId} />
                    <PageViewAnchorMenu />
                    <div >
                        {this.props.children}
                    </div>
                    <Affix offsetBottom={20} style={{ width: '60px', margin: '0 0 0 auto' }}>
                        <MobileBookViewMenuComponent id={this.props.id} bookId={this.props.bookId} />
                    </Affix>
                </Content>
                <HorizontalFooter />
            </Layout >
        )
    }
}

export default PageViewLayout;