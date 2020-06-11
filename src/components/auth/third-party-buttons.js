import React from "react"
import { Button, Alert } from 'antd';
import getFirebase, { getGoogleProvider, getTwitterProvider, getGitHubProvider } from "utils/firebase";
import GoogleIcon from 'images/google.png'
import { GithubOutlined, TwitterOutlined } from '@ant-design/icons'

const shadowButtonStyle = {
    verticalAlign: 'middle',
    boxShadow: '0 2px 8px 0 rgba(37,44,97,.15), 0 1px 2px 0 rgba(93,100,148,.2)',
}
class ThirdPartyButtons extends React.Component {
    state = {
        googleLoading: false,
        twitterLoading: false,
        githubLoading: false,
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
        } else if (type === 'Twitter') {
            this.setState({ twitterLoading: true });
            provider = getTwitterProvider();
        } else if (type === 'GitHub') {
            this.setState({ githubLoading: true });
            provider = getGitHubProvider();
        }

        firebase.auth().signInWithRedirect(provider).then(() => {
            this.setState({ googleLoading: false, twitterLoading: false, githubLoading: false });
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
                    onClick={() => this.signIn('Twitter')}
                    loading={this.state.twitterLoading}
                    style={{ marginTop: '16px', ...shadowButtonStyle }}
                    shape="round"
                    icon={<TwitterOutlined style={{ verticalAlign: 'middle', color: '#1890ff' }} />}
                >
                    <span style={{ textAlign: 'left', verticalAlign: 'middle' }}>
                        Twitterで{this.props.authType}
                    </span>
                </Button>
                <Button
                    block
                    size="large"
                    onClick={() => this.signIn('GitHub')}
                    loading={this.state.githubLoading}
                    style={{ marginTop: '16px', ...shadowButtonStyle }}
                    shape="round"
                    icon={<GithubOutlined style={{ verticalAlign: 'middle', color: 'black' }} />}
                >
                    <span style={{ textAlign: 'left', verticalAlign: 'middle' }}>
                        GitHubで{this.props.authType}
                    </span>
                </Button>
            </div >
        );
    }
}

export default ThirdPartyButtons