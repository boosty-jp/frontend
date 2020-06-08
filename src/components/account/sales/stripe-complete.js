import React from 'react'
import { Link } from 'gatsby'
import { Result, Spin } from 'antd';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import { getErrorMessage } from 'utils/error-handle';
import { LoadingOutlined, EditOutlined } from '@ant-design/icons';
import { createStripeRegistrationLink } from "utils/link-generator";

const REGISTER_STRIPE = gql`
mutation RegisterStripe($userId: String!, $code: String!){
  registerStripe(userId: $userId, code: $code)
}
`;

class StripeCompleteComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            errorMessage: '',
            complete: false,
        }
    }

    componentDidMount() {
        this.props.client.mutate({
            mutation: REGISTER_STRIPE,
            variables: {
                userId: this.props.userId, //CSRF対策でリダイレクトURLに埋め込まれている
                code: this.props.code
            }
        }).then(() => {
            this.setState({ loading: false, errorMessage: '', complete: true });
        }).catch((err) => {
            this.setState({ loading: false, errorMessage: getErrorMessage(err), complete: false });
        });
    }

    render() {
        var content = <></>
        if (this.state.errorMessage) {
            if (getErrorMessage(this.state.errorMessage) === "すでに口座登録が行われています") {
                content =
                    <Result
                        status="error"
                        title="すでに登録済みです"
                        subTitle={<><Link to="/book/edit/list">著書一覧</Link>へ</>}
                    />
            } else {
                content =
                    <Result
                        status="error"
                        title="エラーが発生しました。"
                        subTitle={
                            <>
                                <p>お手数ですが、再度Stripeでの認証を行ってください。(登録手続きは省略されます。)</p>
                                <a href={createStripeRegistrationLink()} >Stripeで再認証する</a>
                            </>
                        }
                    />
            }
        } else if (this.state.complete) {
            content =
                <Result
                    status="success"
                    title="登録手続きが完了しました"
                    extra={[
                        <Link to="/book/edit/list"><EditOutlined style={{ marginRight: '8px' }} />著書一覧へ</Link>
                    ]}
                />
        } else {
            content = <div style={{ height: '200px' }}></div>
        }

        return (
            <Spin
                tip="ロード中です"
                spinning={this.state.loading}
                indicator={< LoadingOutlined style={{ fontSize: 24 }} spin />}
            >
                {content}
            </Spin>
        )
    }
}

export default withApollo(StripeCompleteComponent)