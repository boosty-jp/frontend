import React from "react"
import { presetPalettes } from '@ant-design/colors'
import { TwitterOutlined, LinkOutlined, GithubOutlined } from "@ant-design/icons";

const SnsLinks = ({ twitterId, githubId, url }) => {
    if (!twitterId && !githubId && !url) return <></>
    return (
        <div style={{ marginBottom: '12px', }}>
            {twitterId ?
                <a href={"https://twitter.com/" + twitterId}>
                    <TwitterOutlined style={{ color: presetPalettes.blue[4], marginRight: '8px', fontSize: '20px' }} />
                </a>
                :
                <></>
            }
            {githubId ?
                <a href={"https://github.com/" + githubId}>
                    <GithubOutlined style={{ color: 'black', marginRight: '8px', fontSize: '20px' }} />
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