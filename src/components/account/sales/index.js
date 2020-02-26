import React from "react"
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import ErrorResult from "components/error/result";
import PageLoader from "components/loader/page";
import SaleRegistration from "./registration";
import SaleDashboard from "./dashboard";

const GET_SALES_LINK = gql`
  query GetSalesLink {
    salesLink {
        url
    }
}
`;

class SalesComponent extends React.Component {
    render() {
        return (
            <Query query={GET_SALES_LINK}>
                {({ loading, error, data }) => {
                    if (loading) return <PageLoader />
                    if (error) return <ErrorResult />
                    if (!data.salesLink.url) return <SaleRegistration />
                    return (
                        <SaleDashboard url={data.salesLink.url} />
                    )
                }}
            </Query >
        )
    }
}

export default withApollo(SalesComponent)