import React from "react"
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { Button, message } from "antd";
import { getCurrentUser } from "services/local-user";
import { getStripeErrorMessage, getErrorMessage } from "utils/error-handle"
import { PayCircleOutlined } from "@ant-design/icons";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const stripeStyleOptions = {
    base: {
        fontSize: '16px',
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
            color: '#aab7c4',
        },
    },
    invalid: {
        color: '#9e2146',
    },
};


const PURCHASE_BOOK = gql`
mutation PurchaseBook($paymentIntentId: ID!){
  purchaseBook(paymentIntentId: $paymentIntentId)
}
`;

class BookPurchaseFormComponent extends React.Component {
    state = { loading: false }

    handleSubmit = (ev) => {
        ev.preventDefault();
        this.setState({ loading: true })

        let paymentMethod = {};
        try {
            paymentMethod = {
                card: this.props.elements.getElement('card'),
                billing_details: {
                    name: getCurrentUser().userName,
                }
            };
        } catch (err) {
            message.error("エラーが発生しました。再度お試しください。", 10);
            this.setState({ loading: false })
        }
        // See our confirmCardPayment documentation for more:
        // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment
        this.props.stripe.confirmCardPayment(
            this.props.paymentIntentSecret, { payment_method: paymentMethod, }
        ).then(res => {
            if (res.paymentIntent.status === 'succeeded') {
                this.props.client.mutate({
                    mutation: PURCHASE_BOOK,
                    variables: {
                        paymentIntentId: res.paymentIntent.id,
                    }
                }).then(() => {
                    message.info("購入しました。", 10);
                    this.setState({ loading: false });
                    navigate("/book/own");
                }).catch((err) => {
                    message.error(getErrorMessage(err), 10);
                    this.setState({ loading: false });
                });
            } else {
                message.error("エラーが発生しました。再度お試しください。", 10);
                this.setState({ loading: false })
            }
        }).catch(err => {
            message.error(getStripeErrorMessage(err), 10);
            this.setState({ loading: false })
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <CardElement style={stripeStyleOptions} />
                <Button
                    block
                    size="large"
                    shape="round"
                    type="primary"
                    htmlType="submit"
                    icon={<PayCircleOutlined />}
                    loading={this.state.loading}
                    onClick={this.handleSubmit}
                    style={{ marginTop: '24px', boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }}
                >購入する</Button >
            </form>
        )
    }
}

const BookPurchaseForm = injectStripe(BookPurchaseFormComponent);
export default withApollo(BookPurchaseForm)