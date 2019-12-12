import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './src/sagas/index'
import reducers from './src/modules/index'
import Amplify from 'aws-amplify'
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from 'services/apollo/client';
import { composeWithDevTools } from 'redux-devtools-extension';

const awsConfig = {
    "API": {
        "endpoints": [
            {
                "name": "ImageUploader",
                "region": process.env.GATSBY_AWS_REGION,
                "endpoint": process.env.GATSBY_AWS_IMAGE_UPLOAD_END_POINT,
            },
        ]
    }
};

Amplify.configure(awsConfig)

const sagaMiddleware = createSagaMiddleware();
const devTools = process.env.NODE_ENV === "production" ? applyMiddleware(sagaMiddleware) : composeWithDevTools(applyMiddleware(sagaMiddleware));
const store = createStore(
    reducers,
    devTools
)

sagaMiddleware.run(rootSaga)

export default ({ element }) => {
    return <Provider store={store}><ApolloProvider client={client}>{element}</ApolloProvider></Provider>
}