import React from "react"
import PageLoader from "components/loader/page";
import ErrorResult from "components/error/result";
import { withApollo } from 'react-apollo'
import { message, List } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { getErrorMessage } from "utils/error-handle";
import { getCondition } from "utils/search-condition";
import OrderHistoryItem from "./list-item";

const GET_ORDER_HISTORIES = gql`
  query OrderHistories($page: Int!) {
    orderHistories(page: $page) {
      orderHistories {
        bookId
        title
        imageUrl
        price
        author {
          id
          displayName
          imageUrl
        }
        purchaseDate
      }
      sumCount
    }
  }
`;

class OrderHistories extends React.Component {
    state = {
        loading: false,
        orderHistories: [],
        sumCount: 0,
    }

    onChange = async (page) => {
        try {
            this.setState({ loading: true, });
            const { data } = await this.props.client.query({
                query: GET_ORDER_HISTORIES,
                variables: {
                    searchCondition: getCondition(page),
                }
            });
            this.setResults(data);
        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }
        this.setState({ loading: false });
    }

    setResults = (data) => {
        this.setState({ orderHistories: data.orderHistories.orderHistories, sumCount: data.orderHistories.sumCount });
    }

    render() {
        return (
            <Query
                query={GET_ORDER_HISTORIES}
                variables={{ page: 1 }}
                onCompleted={this.setResults}
            >
                {({ loading, error }) => {
                    if (loading) return <PageLoader />
                    if (error) return <ErrorResult />
                    return (
                        <List
                            dataSource={this.state.orderHistories}
                            renderItem={item => (
                                <List.Item>
                                    <OrderHistoryItem orderHistory={item} />
                                </List.Item>
                            )}
                        />
                    )
                }}
            </Query>
        )
    }
}

export default withApollo(OrderHistories)