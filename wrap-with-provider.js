import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './src/modules/index'
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from 'services/apollo/client';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { StripeProvider } from 'react-stripe-elements';

const store = createStore(
    reducers,
    composeWithDevTools()
)

const wrapWithProvider = ({ element }) => {
    return (
        <App element={element} />
    )
}

class App extends React.Component {
    constructor() {
        super();
        this.state = { stripe: null };
    }

    componentDidMount() {
        if (window.Stripe) {
            this.setState({ stripe: window.Stripe(process.env.GATSBY_STRIPE_API_KEY) });
        } else {
            document.querySelector('#stripe-js').addEventListener('load', () => {
                // Create Stripe instance once Stripe.js loads
                this.setState({ stripe: window.Stripe(process.env.GATSBY_STRIPE_API_KEY) });
            });
        }
    }

    render() {
        console.log(store);
        return (
            <StripeProvider stripe={this.state.stripe}>
                <Provider store={store}>
                    <ApolloProvider client={client}>
                        {this.props.element}
                    </ApolloProvider>
                </Provider>
            </StripeProvider >
        )
    }
}

export default wrapWithProvider;