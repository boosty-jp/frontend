import React from "react"
import { Button, Typography, Result } from 'antd';
import { Link } from "gatsby";
import { createBookDetailLink } from "utils/link-generator";
import { TwitterCircleFilled } from "@ant-design/icons";

const { Paragraph } = Typography;

const TwitterComponent = () => {
    return (
        <div style={{ backgroundColor: '#F7FAFF', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                <Paragraph style={{ color: 'black', marginBottom: '8px' }}>最新情報のキャッチアップ</Paragraph>
            </div>
            <Result
                icon={<TwitterCircleFilled />}
                title={<span style={{ fontSize: '18px' }}>新しい技術書の販売情報や<br />サービスのアップデート情報は<br />Twitterにて確認できます</span>}
                extra={<a href="https://twitter.com/boosty_official" target="_blank">
                    <Button type="primary" shape="round">Twitterをフォローする</Button>
                </a>}
            />
        </div>
    )
}
export default TwitterComponent