import React from "react"
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import { Typography, Switch, message } from 'antd';
import BookCoverImage from "components/image/cover";
import { createBookDetailLink } from "utils/link-generator";
import { Link } from "gatsby";
const { Paragraph } = Typography;

const UPDATE_BOOK_MEANINGFUL = gql`
mutation updateBookMeaningful($bookId: ID!, $meaningful: Boolean!){
  updateBookMeaningful(bookId: $bookId, meaningful: $meaningful)
}
`;

class AllNewItem extends React.Component {
    state = { loading: false }

    updateMeaningful = async checked => {
        this.setState({ loading: true })
        try {
            await this.props.client.mutate({
                mutation: UPDATE_BOOK_MEANINGFUL,
                variables: {
                    bookId: this.props.id,
                    meaningful: checked
                }
            });
            message.success("更新しました", 7)
        } catch (err) {
            message.error("エラーが発生しました。お手数ですが、再度お試しください", 7)
        }

        this.setState({ loading: false })
    }

    render() {
        const updateDateTime = new Date(parseInt(this.props.updateDate, 10));
        return (
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', width: "100%" }}>
                <div >
                    <Link to={createBookDetailLink(this.props.id)}>
                        <BookCoverImage imageUrl={this.props.imageUrl} boxShadow="2px 2px 4px #cdd0d4, -2px -2px 4px #ffffff" borderRadius="0.5rem" />
                    </Link>
                </div>
                <div style={{ margin: '10px 0px 0px 0px', textAlign: 'left', padding: '0px 20px' }}>
                    <Link to={createBookDetailLink(this.props.id)}>
                        <Paragraph ellipsis={{ rows: 2 }} style={{ color: 'black', fontSize: '20px', marginBottom: '4px', }}>
                            {this.props.title}
                        </Paragraph>
                    </Link>
                    <Paragraph ellipsis style={{ marginBottom: '4px', fontSize: '16px' }}>
                        {this.props.author.name}
                    </Paragraph>
                    <Paragraph ellipsis style={{ marginBottom: '4px', fontSize: '16px' }}>
                        更新日: {updateDateTime.toLocaleDateString('ja-JP').slice(5)}
                    </Paragraph>
                    <Switch
                        loading={this.state.loading}
                        checkedChildren="公開"
                        unCheckedChildren="非公開"
                        defaultChecked={this.props.meaningful}
                        onChange={(checked, e) => this.updateMeaningful(checked)}
                    />
                </div>
            </div>
        )
    }
}

export default withApollo(AllNewItem)