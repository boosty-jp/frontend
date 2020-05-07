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

class BookPurchaseButtonComponent extends React.Component {
    state = { visible: false }

    render() {
        return (
            <>
                <Button
                    block
                    size="large"
                    shape="round"
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    style={{ boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }}
                    onClick={() => this.setState({ visible: true })}
                >購入する</Button >
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
    imageUrl: state.bookView.imageUrl,
    price: state.bookView.price,
})

const BookPurchaseButton = connect(mapStateToProps)(BookPurchaseButtonComponent)
export default withApollo(BookPurchaseButton);