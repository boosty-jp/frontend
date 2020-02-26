import React from "react"
import { injectStripe, CardElement } from 'react-stripe-elements';
import { Button } from "antd";
import { getCurrentUser } from "services/local-user";

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

const purchaseButtonStyle = {
    borderColor: '#F7FAFF',
    color: '#1890ff',
    fontWeight: '500',
    fontSize: '16px',
    background: '#F7FAFF',
    boxShadow: '4px 4px 8px #a3a5a8, -4px -4px 8px #ffffff',
    marginTop: '20px'
}

class BookPurchaseFormComponent extends React.Component {
    state = { loading: false }

    handleSubmit = (ev) => {
        ev.preventDefault();
        this.setState({ loading: true })

        // See our confirmCardPayment documentation for more:
        // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment
        this.props.stripe.confirmCardPayment(this.props.paymentIntentSecret, {
            payment_method: {
                card: this.props.elements.getElement('card'),
                billing_details: {
                    name: getCurrentUser().userName,
                },
            }
        });

        // //カード情報をiframeより取得し、Stripeに送るリクエスト情報を生成する
        // // https://stripe.com/docs/js/payment_intents/create_payment_method
        // const cardElement = this.props.elements.getElement('card');
        // this.props.stripe
        //     .createPaymentMethod({
        //         type: 'card',
        //         card: cardElement,
        //         billing_details: { name: 'Jenny Rosen' },
        //     })
        //     .then(({ paymentMethod }) => {
        //         console.log('Received Stripe PaymentMethod:', paymentMethod);
        //     });

        // // 不正利用のチェック(3Dセキュア)
        // // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment
        // this.props.stripe.confirmCardPayment('{PAYMENT_INTENT_CLIENT_SECRET}', {
        //     payment_method: {
        //         card: cardElement,
        //     },
        // });

        // // カードの検証 confirmCardPaymentとの違い
        // // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment
        // this.props.stripe.confirmCardSetup('{PAYMENT_INTENT_CLIENT_SECRET}', {
        //     payment_method: {
        //         card: cardElement,
        //     },
        // });

        // this.props.stripe.createToken({ type: 'card', name: 'Jenny Rosen' });

        // this.props.stripe.createSource({
        //     type: 'card',
        //     owner: {
        //         name: 'Jenny Rosen',
        //     },
        // });
        this.setState({ loading: false })
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {/* <AddressSection /> */}
                <CardElement style={stripeStyleOptions} />
                <Button
                    block
                    size="large"
                    shape="round"
                    htmlType="submit"
                    icon="pay-circle"
                    loading={this.state.loading}
                    style={purchaseButtonStyle}
                    onClick={this.handleSubmit}
                >購入する</Button >
            </form>
        )
    }
}

const BookPurchaseForm = injectStripe(BookPurchaseFormComponent);
export default BookPurchaseForm