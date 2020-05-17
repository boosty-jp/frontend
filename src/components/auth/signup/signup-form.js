import React from "react"
import { Divider, Spin, message } from 'antd';
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import { setUser } from "services/local-user";
import getFirebase from "utils/firebase";
import styled from 'styled-components'
import OwnSignUpForm from 'components/auth/signup/own-signup-form'
import ThirdPartyButtons from "components/auth/third-party-buttons";
import { LoadingOutlined } from "@ant-design/icons"

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const CREATE_USER = gql`
mutation CreateUser($displayName: String!, $imageUrl: String!) {
  createUser(displayName: $displayName, imageUrl: $imageUrl){
      id
  }
}
`;

const SignUpDivider = styled(Divider)`
  .ant-divider-inner-text {
      fontSize: '14px',
  }
`;

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        const firebase = getFirebase();
        firebase.auth().getRedirectResult().then((result) => {
            if (result.user) {
                // サードパーティで認証後にリダイレクトしてきたときの処理
                this.createUser(result.user)
            } else {
                // 通常処理
                this.setState({ loading: false })
            }
        }).catch((error) => {
            this.setState({ loading: false })
            this.handleAuthError(error);
        });
    }

    createUser = async (user) => {
        let displayName = '';
        if (user.displayName) {
            displayName = user.displayName.length > 30 ? user.displayName.slice(0, 30) : user.displayName;
        } else {
            displayName = "ユーザー名未設定";
        }
        try {
            await this.props.client.mutate({
                mutation: CREATE_USER,
                variables: { displayName: displayName, imageUrl: user.photoURL }
            });

            setUser({ userId: user.uid, imageUrl: user.photoURL, userName: displayName })
            navigate("/")
            message.info("会員登録が完了しました", 7)
        } catch (err) {
            message.error("エラーが発生しました。お手数ですが、再度お試しください。", 7)
        }
        this.setState({ loading: false })
    }

    handleAuthError = (error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/account-exists-with-different-credential' || errorCode === 'auth/email-already-in-use' || errorCode === 'auth/credential-already-in-use') {
            // すでにそのメールでアカウントが作成されていた場合
            message.error("すでにweverにアカウントが作成されています。別の認証方式でログインしてください", 7)
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
                <ThirdPartyButtons authType="会員登録" />
                <SignUpDivider>もしくは</SignUpDivider>
                <OwnSignUpForm />
            </Spin>
        );
    }
}

export default withApollo(SignUpForm)