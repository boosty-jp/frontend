import React from "react"
import { Divider, Spin, Icon, message } from 'antd';
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import { setUser } from "services/local-user";
import getFirebase from "utils/firebase";
import styled from 'styled-components'
import OwnSignUpForm from 'components/auth/signup/own-signup-form'
import ThirdPartyButtons from "components/auth/third-party-buttons";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const CREATE_USER = gql`
mutation CreateUser($userInput: UserInput!) {
  createUser(user: $userInput){
    error{
        errorCode
        errorMessage
    }
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
                console.log('create')
                // this.createUser(result.user)
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
        const displayName = user.displayName.length > 30 ? user.displayName.slice(0, 30) : user.displayName;
        try {
            await this.props.client.mutate({
                mutation: CREATE_USER,
                variables: { userInput: { displayName: displayName, description: "", url: "", tags: [], imageUrl: user.photoURL } }
            });

            setUser({ userId: user.uid, imageUrl: user.photoURL, userName: displayName })
            navigate("/auth/registered")
        } catch (err) {
            message.error("エラーが発生しました。お手数ですが、再度お試しください。", 7)
        }
        this.setState({ loading: false })
    }

    handleAuthError = (error) => {
        const errorCode = error.code;
        if (errorCode == 'auth/account-exists-with-different-credential' || errorCode === 'auth/email-already-in-use' || errorCode === 'auth/credential-already-in-use') {
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
                indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}
            >
                <OwnSignUpForm />
                <SignUpDivider>もしくは</SignUpDivider>
                <ThirdPartyButtons />
            </Spin>
        );
    }
}

export default withApollo(SignUpForm)