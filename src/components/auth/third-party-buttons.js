import React from "react"
import { Button, Icon } from 'antd';
import getFirebase, { getGoogleProvider, getFacebookProvider } from "utils/firebase";
import { presetPalettes } from '@ant-design/colors'
import GoogleIcon from 'images/google.png'
import FacebookIcon from 'images/facebook.png'
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
                    style={{ verticalAlign: 'middle' }}
                >
                    <span style={{ verticalAlign: 'middle' }}>
                        <img src={GoogleIcon} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
                        Googleで{this.props.authType}
                    </span>
                </Button>
                <Button
                    block
                    size="large"
                    onClick={() => this.signIn('Facebook')}
                    loading={this.state.facebookLoading}
                    style={{ marginTop: '16px' }}
                >
                    <span style={{ textAlign: 'left', verticalAlign: 'middle' }}>
                        <img src={FacebookIcon} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
                        Facebookで{this.props.authType}
                    </span>
                </Button>
            </div >
        );
    }
}

export default ThirdPartyButtons