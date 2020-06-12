import React from "react"
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { Button, Modal, Row, Col, Statistic, message } from 'antd';
import BookPurchaseForm from 'components/book/view/detail/header/action/purchase/form'
import { Elements } from 'react-stripe-elements';
import BookCoverImage from "components/image/cover";
import styled from 'styled-components'
import { getErrorMessage } from "utils/error-handle";
import PageLoader from 'components/loader/page'
import { ShoppingCartOutlined } from "@ant-design/icons"
import { isLoggedIn } from "services/local-user";
import NeedLoginComponent from "components/auth/need-login";
import { createPageViewLink } from "utils/link-generator";
import { Link } from "gatsby"

const CustomModal = styled(Modal)`
  .ant-modal-content {
    background: #f0f5ff;
  }
`;

const GET_PAYMENT_INTENT = gql`
  query GetPaymentIntent($bookId: ID!) {
    paymentIntent(bookId: $bookId) {
        price
        secret
    }
}
`;

const getTrialReadFirstPageId = (sections) => {
    for (let i = 0; i < sections.length; i++) {
        for (let j = 0; j < sections[i].pages.length; j++) {
            if (sections[i].pages[j].canPreview) {
                return sections[i].pages[j].id;
                break;
            }
        }
    }
    return "";
}

class BookPurchaseButtonComponent extends React.Component {
    state = { visible: false, loginModalVisible: false }

    handleClick = () => {
        if (!isLoggedIn()) {
            this.setState({ loginModalVisible: true });
            return;
        }
        this.setState({ visible: true });
    }

    render() {
        const trialReadPageId = getTrialReadFirstPageId(this.props.sections);
        return (
            <>
                <Button
                    block
                    size="large"
                    shape="round"
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    style={{ boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }}
                    onClick={this.handleClick}
                >購入する</Button >
                {trialReadPageId &&
                    <Link to={createPageViewLink(trialReadPageId, this.props.id)}>
                        <Button
                            block
                            size="large"
                            shape="round"
                            type="link"
                            style={{ boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)', marginTop: '20px' }}
                            onClick={this.handleClick}
                        >試し読みする</Button >
                    </Link>
                }
                <Modal
                    closable
                    footer={null}
                    visible={this.state.loginModalVisible}
                    onCancel={() => this.setState({ loginModalVisible: false })}
                >
                    <NeedLoginComponent message="ご購入にはログインが必要です" />
                </Modal>
                <CustomModal
                    footer={null}
                    visible={this.state.visible}
                    closable
                    onCancel={() => this.setState({ visible: false })}
                >
                    <Query
                        query={GET_PAYMENT_INTENT}
                        variables={{ bookId: this.props.id }}
                        onError={err => {
                            this.setState({ visible: false });
                            message.error(getErrorMessage(err));
                        }}
                    >
                        {({ loading, error, data }) => {
                            if (loading) return <PageLoader />
                            if (error) return <></>
                            return (
                                <>
                                    <Row align="top" type="flex" gutter={16}>
                                        <Col span={4} style={{ textAlign: 'center' }}>
                                            <BookCoverImage imageUrl={this.props.imageUrl} boxShadow="2px 2px 4px #cdd0d4, -2px -2px 4px #ffffff" />
                                        </Col>
                                        <Col span={20} style={{ textAlign: 'left' }}>
                                            <span style={{ color: 'black', fontSize: '20px' }}>
                                                {this.props.title}
                                            </span>
                                            <div style={{ marginTop: '8px' }}>
                                                <Statistic value={data.paymentIntent.price} suffix="円" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <div style={{ marginTop: '24px' }}>
                                        <Elements><BookPurchaseForm paymentIntentSecret={data.paymentIntent.secret} /></Elements>
                                    </div>
                                </>
                            )
                        }}
                    </Query >
                </CustomModal>
            </>
        )
    }
}

const mapStateToProps = state => ({
    id: state.bookView.id,
    title: state.bookView.title,
    sections: state.bookView.sections,
    imageUrl: state.bookView.imageUrl,
    price: state.bookView.price,
})

const BookPurchaseButton = connect(mapStateToProps)(BookPurchaseButtonComponent)
export default withApollo(BookPurchaseButton);