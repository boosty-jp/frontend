import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './src/modules/index'
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from 'services/apollo/client';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

const store = createStore(
    reducers,
    devToolsEnhancer()
)

export default ({ element }) => {
    return <Provider store={store}><ApolloProvider client={client}>{element}</ApolloProvider></Provider>
}