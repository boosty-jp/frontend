import React from "react"
import { Icon } from 'antd';
import { presetPalettes } from '@ant-design/colors'

const SnsLinks = ({ twitterId, facebookId, url }) => {
    if (!twitterId && !facebookId && !url) return <></>
    return (
        <div style={{ marginBottom: '12px' }}>
            {twitterId ?
                <a href={"https://twitter.com/" + twitterId}>
                    <Icon type="twitter" style={{ color: presetPalettes.blue[4], marginRight: '8px', fontSize: '20px' }} />
                </a>
                :
                <></>
            }
            {facebookId ?
                <a href={"https://facebook.com/" + facebookId}>
                    <Icon type="facebook" theme="filled" style={{ color: presetPalettes.blue[7], marginRight: '12px', fontSize: '20px' }} />
                </a>
                :
                <></>
            }
            {url ?
                <><Icon type="link" style={{ marginRight: '4px', fontSize: '16px' }} /> <a href={url}>{url}</a></>
                :
                <></>
            }
        </div>
    );
}

export default SnsLinks;