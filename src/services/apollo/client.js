import { ApolloClient } from 'apollo-client';
import fetch from 'node-fetch';
import { createHttpLink } from 'apollo-link-http';
import { RetryLink } from "apollo-link-retry";
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import getToken from 'services/token/firebase'

const httpLink = createHttpLink({
    uri: process.env.GATSBY_GRAPHQL_END_POINT,
    fetch: fetch,
});

const authLink = setContext((_, { headers }) => {
    return getToken().then((token) => {
        return {
            headers: {
                ...headers,
                AuthorizationToken: token,
            }
        }
    }).catch(() => {
        return {
            headers: {
                ...headers,
                AuthorizationToken: "",
            }
        }
    })
});

// ネットワークエラー時のリトライ処理
const retryLink = new RetryLink({
    delay: {
        initial: 300,
        max: Infinity,
        jitter: true
    },
    attempts: {
        max: 7,
        retryIf: (error, _operation) => {
            if (error.message === "INTERNAL SERVER ERROR" ||
                error.type === "system") {
                return !!error;
            } else {
                return false;
            }
        }
    }
});

// GraphQLのエラー時のリトライ処理
// TODO:エラーの種別でリトライを限定させる
const errorLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((data) => {
        if (data && data.errors && data.errors.length > 0) {
            data.errors.forEach((e) => {
                if (!e.extensions || !e.extensions.errorCode) {
                    throw new Error("INTERNAL SERVER ERROR");
                }
                throw new Error(e.extensions.errorMessage);
            });
        }
        return data;
    });
});

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
}

export const client = new ApolloClient({
    link: ApolloLink.from([authLink, retryLink, errorLink, httpLink]),
    cache: new InMemoryCache({
        addTypename: false
    }),
    defaultOptions: defaultOptions,
    fetchOptions: {
        mode: 'cors',
    },
});