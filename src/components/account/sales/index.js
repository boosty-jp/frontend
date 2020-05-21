import React from "react"
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import ErrorResult from "components/error/result";
import PageLoader from "components/loader/page";
import SaleRegistration from "./registration";

const GET_SALES_LINK = gql`
  query GetSalesLink {
    salesLink {
        url
    }
}
`;

class SalesComponent extends React.Component {
    redirectToSalePage = data => {
        if (!data || !data.salesLink || !data.salesLink.url) {
            return;
        }
        window.location.replace(data.salesLink.url);
    }
    render() {
        return (
            <Query
                query={GET_SALES_LINK}
                onCompleted={data => this.redirectToSalePage(data)}
            >
                {({ loading, error, data }) => {
                    if (loading) return <PageLoader />
                    if (error) return <ErrorResult />
                    if (!data.salesLink.url) return <SaleRegistration />
                    return (
                        <></>
                    )
                }}
            </Query >
        )
    }
}

export default withApollo(SalesComponent)