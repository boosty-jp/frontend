import React from "react"
import { presetPalettes } from '@ant-design/colors'
import { TwitterOutlined, LinkOutlined } from "@ant-design/icons";
import FACEBOOK_IMG from 'images/facebook_high_res.png'

const SnsLinks = ({ twitterId, facebookId, url }) => {
    if (!twitterId && !facebookId && !url) return <></>
    return (
        <div style={{ marginBottom: '12px', }}>
            {twitterId ?
                <a href={"https://twitter.com/" + twitterId}>
                    <TwitterOutlined style={{ color: presetPalettes.blue[4], marginRight: '8px', fontSize: '20px' }} />
                </a>
                :
                <></>
            }
            {facebookId ?
                <a href={"https://facebook.com/" + facebookId}>
                    <img src={FACEBOOK_IMG} style={{ marginRight: '12px', width: '20px', height: 'auto', verticalAlign: 'top' }} />
                </a>
                :
                <></>
            }
            {url ?
                <><LinkOutlined style={{ marginRight: '4px', fontSize: '16px' }} /> <a href={url}>{url}</a></>
                :
                <></>
            }
        </div>
    );
}

export default SnsLinks;