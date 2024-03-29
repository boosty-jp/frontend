import React from "react"
import { Divider, Spin, message } from 'antd';
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import { setUser } from "services/local-user";
import getFirebase from "utils/firebase";
import styled from 'styled-components'
import OwnLoginForm from "components/auth/login/own-login-form";
import ThirdPartyButtons from "components/auth/third-party-buttons";
import { getLoginErrorMessage } from "utils/error-handle";
import { LoadingOutlined } from "@ant-design/icons";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const CREATE_USER = gql`
mutation CreateUser($displayName: String!, $imageUrl: String!) {
  createUser(displayName: $displayName, imageUrl: $imageUrl){
      id
  }
}
`;

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
                this.setLoginData(result.user);
            } else {
                this.setState({ loading: false })
            }
        }).catch((error) => {
            this.setState({ loading: false })
            this.handleAuthError(error);
        });
    }

    setLoginData = async (user) => {
        const userId = user.uid;
        try {
            const { data } = await this.props.client.query({
                query: GET_USER,
                variables: { userId: userId }
            });

            setUser({ userId: userId, imageUrl: data.user.imageUrl, userName: data.user.displayName })

            navigate("/")
            message.info("ログインしました", 7)
        } catch (err) {
            // ユーザー情報取得できない場合は、boosty上に登録していない可能性があるので、登録のAPIを叩く
            try {
                let displayName = '';
                if (user.displayName) {
                    displayName = user.displayName.length > 30 ? user.displayName.slice(0, 30) : user.displayName;
                } else {
                    displayName = "ユーザー名未設定";
                }

                await this.props.client.mutate({
                    mutation: CREATE_USER,
                    variables: { displayName: displayName, imageUrl: user.photoURL }
                });

                setUser({ userId: userId, imageUrl: user.photoURL, userName: displayName })

                this.setState({ loading: false })
                navigate("/")
                message.info("ログインしました", 7)
            } catch (err) {
                this.setState({ loading: false })
                message.error(getLoginErrorMessage(err), 7)
            }
        }
    }

    handleAuthError = (error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/account-exists-with-different-credential' || errorCode === 'auth/email-already-in-use' || errorCode === 'auth/credential-already-in-use') {
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
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            >
                <ThirdPartyButtons authType="ログイン" />
                <LoginDivider>もしくは</LoginDivider>
                <OwnLoginForm />
            </Spin>
        );
    }
}

export default withApollo(LoginForm)