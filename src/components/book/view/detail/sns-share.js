import React from "react"
import { connect } from 'react-redux'
import { Button } from "antd"
import { TwitterOutlined } from "@ant-design/icons"
import { FacebookShareButton, TwitterShareButton, } from 'react-share'
import FACEBOOK_IMG from 'images/facebook_high_res.png'
import { createBookDetailUrl } from "utils/link-generator"

const SnsShareButtonsComponent = (props) => {
    return (
        <div>
            <TwitterShareButton
                title={props.title}
                url={createBookDetailUrl(props.id)}
            >
                <Button
                    size="large"
                    shape="circle"
                    icon={<TwitterOutlined style={{ color: '#1890ff', fontSize: '20px' }} />}
                    style={{
                        marginRight: '8px',
                        verticalAlign: 'middle',
                        background: '#1890ff',
                        border: '1px solid #1890ff',
                        boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
                    }}
                >
                </Button>
            </TwitterShareButton>
            <FacebookShareButton
                quote={props.title.title}
                url={createBookDetailUrl(props.id)}
            >
                <Button
                    size="large"
                    shape="circle"
                    icon={<img src={FACEBOOK_IMG} style={{ width: '24px', height: 'auto', marginTop: '-8px' }} alt="Facebooロゴ" />}
                    style={{
                        marginRight: '8px',
                        verticalAlign: 'middle',
                        background: '#1977F2',
                        border: '1px solid #1977F2',
                        boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
                    }}
                >
                </Button>
            </FacebookShareButton>
        </div>
    )
}

const mapStateToProps = state => ({
    id: state.bookView.id,
    title: state.bookView.title,
    description: state.bookView.description,
})

const SnsShareButtons = connect(mapStateToProps)(SnsShareButtonsComponent);
export default SnsShareButtons;