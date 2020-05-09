import React from "react"
import { Button } from 'antd';
import getFirebase, { getGoogleProvider, getFacebookProvider } from "utils/firebase";
import GoogleIcon from 'images/google.png'
import FacebookIcon from 'images/facebook_high_res.png'

const shadowButtonStyle = {
    verticalAlign: 'middle',
    boxShadow: '0 2px 8px 0 rgba(37,44,97,.15), 0 1px 2px 0 rgba(93,100,148,.2)',
}
class ThirdPartyButtons extends React.Component {
    state = {
        googleLoading: false,
        facebookLoading: false,
    }

    signIn = (type) => {
        const firebase = getFirebase();
        var provider;

        // プロバイダーごとの個別設定
        if (type === 'Google') {
            this.setState({ googleLoading: true });
            //ポップアップする画面の言語指定
            firebase.auth().languageCode = 'ja';
            provider = getGoogleProvider();
        } else if (type === 'Facebook') {
            this.setState({ facebookLoading: true });
            provider = getFacebookProvider();
        }

        firebase.auth().signInWithRedirect(provider).then(() => {
            this.setState({ googleLoading: false, facebookLoading: false });
        });
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <Button
                    block
                    size="large"
                    onClick={() => this.signIn('Google')}
                    loading={this.state.googleLoading}
                    style={shadowButtonStyle}
                    shape="round"
                >
                    <span style={{ verticalAlign: 'middle' }}>
                        <img src={GoogleIcon} style={{ marginRight: '12px', verticalAlign: 'middle' }} alt="Googleロゴ" />
                        Googleで{this.props.authType}
                    </span>
                </Button>
                <Button
                    block
                    size="large"
                    onClick={() => this.signIn('Facebook')}
                    loading={this.state.facebookLoading}
                    style={{ marginTop: '16px', ...shadowButtonStyle }}
                    shape="round"
                >
                    <span style={{ textAlign: 'left', verticalAlign: 'middle' }}>
                        <img src={FacebookIcon} style={{ marginRight: '12px', verticalAlign: 'middle', width: '20px', height: 'auto' }} alt="Facebookロゴ" />
                        Facebookで{this.props.authType}
                    </span>
                </Button>
            </div >
        );
    }
}

export default ThirdPartyButtons