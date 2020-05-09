import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './src/modules/index'
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from 'services/apollo/client';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import StripeScriptLoader from 'react-stripe-script-loader'
import { StripeProvider } from 'react-stripe-elements';

const store = createStore(
    reducers,
    devToolsEnhancer()
)

export default ({ element }) => {
    return (
        <StripeScriptLoader
            uniqueId='scriptId'
            script='https://js.stripe.com/v3/'
            loader="Loading..."
        >
            <StripeProvider apiKey={process.env.GATSBY_STRIPE_API_KEY}>
                <Provider store={store}>
                    <ApolloProvider client={client}>{element}</ApolloProvider>
                </Provider>
            </StripeProvider>
        </StripeScriptLoader>
    )
}