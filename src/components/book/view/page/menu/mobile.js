import React from "react"
import { Row, Col, Button, Drawer } from 'antd';
import { connect } from 'react-redux'
import { setBookData } from 'modules/book/view'
import { withApollo } from 'react-apollo'
import BookViewMenuSections from "./sections";
import BookViewMenuHeader from "./header";
import { ReadOutlined } from "@ant-design/icons";

class MobileBookViewMenuComponent extends React.Component {
    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <Row>
                <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                    <Button
                        shape="circle"
                        icon={<ReadOutlined />}
                        size="large"
                        style={{ boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }}
                        onClick={this.showDrawer}
                    />
                    <Drawer
                        placement="right"
                        closable={true}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        <div style={{ marginTop: '20px' }}>
                            <BookViewMenuHeader />
                            <div style={{ marginTop: '16px' }}>
                                <BookViewMenuSections pageId={this.props.id} />
                            </div>
                        </div>
                    </Drawer>
                </Col>
            </Row>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setBookData: (book, isPreview) => dispatch(setBookData(book, isPreview)),
})

const MobileBookViewMenu = connect(null, mapDispatchToProps)(MobileBookViewMenuComponent);
export default withApollo(MobileBookViewMenu)