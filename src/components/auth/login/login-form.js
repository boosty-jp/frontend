import React from "react"
import { Divider, Spin, Icon, message } from 'antd';
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import { setUser } from "services/local-user";
import getFirebase from "utils/firebase";
import styled from 'styled-components'
import OwnLoginForm from "components/auth/login/own-login-form";
import ThirdPartyButtons from "components/auth/third-party-buttons";
import { getErrorMessage } from "utils/error-handle";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(userId: $userId) {
       imageUrl
       displayName
    }
}
`;

const LoginDivider = styled(Divider)`
  .ant-divider-inner-text {
      fontSize: '14px',
  }
`;

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        const firebase = getFirebase();
        firebase.auth().getRedirectResult().then((result) => {
            // サードパーティで認証後にリダイレクトしてきたときの処理
            if (result.user) {
                this.setLoginData(result.user.uid);
            } else {
                this.setState({ loading: false })
            }
        }).catch((error) => {
            this.setState({ loading: false })
            this.handleAuthError(error);
        });
    }

    setLoginData = async (userId) => {
        try {
            const { data } = await this.props.client.query({
                query: GET_USER,
                variables: { userId: userId }
            });

            console.log('d', data);
            setUser({ userId: userId, imageUrl: data.user.imageUrl, userName: data.user.displayName })

            setUser({ userId: 'tomokiya', imageUrl: '', userName: 'tomokiya' })
            navigate("/")
            message.info("ログインしました", 7)
        } catch (err) {
            this.setState({ loading: false })
            message.error(getErrorMessage(err), 7)
        }
    }

    handleAuthError = (error) => {
        const errorCode = error.code;
        if (errorCode == 'auth/account-exists-with-different-credential' || errorCode === 'auth/email-already-in-use' || errorCode === 'auth/credential-already-in-use') {
            // すでにそのメールでアカウントが作成されていた場合
            message.error("別の認証方式でアカウントが登録されています。別のログイン形式からログインしてください。", 7)
        } else {
            message.error("エラーが発生しました。お手数ですが、再度お試しください。", 7)
        }
    }

    render() {
        return (
            <Spin
                tip="ロード中です"
                spinning={this.state.loading}
                indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}
            >
                <ThirdPartyButtons authType="ログイン" />
                <LoginDivider>もしくは</LoginDivider>
                <OwnLoginForm />
            </Spin>
        );
    }
}

export default withApollo(LoginForm)