import React from "react"
import { Button } from 'antd';
import getFirebase, { getGoogleProvider, getFacebookProvider } from "utils/firebase";
import { presetPalettes } from '@ant-design/colors'

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
                    icon="google"
                    onClick={() => this.signIn('Google')}
                    loading={this.state.googleLoading}
                    style={{ backgroundColor: presetPalettes.red.primary, borderColor: presetPalettes.red.primary, color: 'white', marginRight: '12px' }}
                />
                <Button
                    icon="facebook"
                    onClick={() => this.signIn('Facebook')}
                    loading={this.state.facebookLoading}
                    style={{ backgroundColor: presetPalettes.blue[7], borderColor: presetPalettes.blue[7], color: 'white', marginRight: '12px' }}
                />
                {/* <Button
                    icon="twitter"
                    onClick={()=>this.signUp()}
                    style={{ backgroundColor: presetPalettes.blue[4], borderColor: presetPalettes.blue[4], color: 'white' }}
                /> */}
            </div>
        );
    }
}

export default ThirdPartyButtons