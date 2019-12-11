import React from 'react';
import { Avatar, Icon } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import { presetPalettes } from '@ant-design/colors'

const AuthorCard = () => {
    return (
        <div style={{ padding: '24px', backgroundColor: 'white' }}>
            <div style={{ textAlign: 'center' }}>
                <div>
                    <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </div>
                <div style={{ marginTop: '8px' }}>
                    <Ellipsis length={20} tooltip style={{ fontSize: '16px' }}>Tomoki Yamashita</Ellipsis>
                </div>
            </div>
            <div style={{ marginTop: '12px' }}>
                <Ellipsis length={120} tooltip >自分の興味の元に、Windowsアプリケーション・Androidアプリ・Webサイト・Webアプリを開発しているモデラーです。Twitterやってます。</Ellipsis>
            </div>
            <div style={{ marginTop: '12px' }}>
                <Icon type="twitter" style={{ color: presetPalettes.blue[4], marginRight: '8px', fontSize: '20px' }} />
                <Icon type="facebook" theme="filled" style={{ color: presetPalettes.blue[7], marginRight: '12px', fontSize: '20px' }} />
                <Icon type="link" style={{ marginRight: '4px', fontSize: '16px' }} /><a>http:tomokiya.co.jp</a>
            </div>
        </div>
    )
}

export default AuthorCard