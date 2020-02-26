import React from 'react'
import { Link } from 'gatsby'
import { Result, Icon, Spin } from 'antd';
import { navigate } from '@reach/router';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo'
import SimpleBorderedShadowButton from 'components/button/simple-border-shadow';
import { getErrorMessage } from 'utils/error-handle';


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
            content =
                <Result
                    status="error"
                    title="すでに登録済みです"
                    subTitle={<><Link to="/book/edit/list">著書一覧</Link>へ</>}
                />
        } else if (this.state.complete) {
            content =
                <Result
                    status="success"
                    title="登録手続きが完了しました"
                    extra={[
                        <SimpleBorderedShadowButton
                            text="著書一覧へ"
                            color="#1890ff"
                            onClick={() => navigate('/book/edit/list')}
                        />
                    ]}
                />
        } else {
            content = <div style={{ height: '200px' }}></div>
        }

        return (
            <Spin
                tip="ロード中です"
                spinning={this.state.loading}
                indicator={< Icon type="loading" style={{ fontSize: 24 }} spin />}
            >
                {content}
            </Spin>
        )
    }
}

export default withApollo(StripeCompleteComponent)