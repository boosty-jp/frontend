import React from "react"
import { Button, Tooltip, notification, Typography } from 'antd';
import TOOL_BAR_OPEN_IMG from 'images/toolbar-open.gif'
import TEXT_DECORATION_IMG from 'images/text-decoration.gif'

const { Paragraph } = Typography;

const EditorGuideDescription = () => {
    return (
        <div>
            <Paragraph style={{ marginBottom: '4px', color: 'black' }}>
                <span style={{ fontWeight: 'bold' }}>ツールバーの表示: </span>
                <span style={{ marginBottom: '4px', fontSize: '14px' }}>
                    <code className="inline-code" style={{ display: 'inline-block' }}>Tab</code>もしくは＋ボタンを押す
                </span>
            </Paragraph>
            <img src={TOOL_BAR_OPEN_IMG} style={{ width: '70%', height: 'auto' }} />
            <Paragraph style={{ marginTop: "12px", marginBottom: '4px', color: 'black' }}>
                <span style={{ fontWeight: 'bold' }}>文字の装飾: </span>
                <span style={{ marginBottom: '4px', fontSize: '14px' }}>対象文字を選択する</span>
            </Paragraph>
            <img src={TEXT_DECORATION_IMG} style={{ width: '70%', height: 'auto' }} />
        </div>
    )
}
export default class PageEditHint extends React.Component {
    showHint = () => {
        notification.open({
            message: `書き方のガイド`,
            description: <EditorGuideDescription />,
            placement: 'bottomRight',
            duration: 0,
            style: { minWidth: '300px' }
        });
    }
    render() {
        return (
            <div style={{ marginTop: '8px' }}>
                <Tooltip placement="left" title="書き方のガイド">
                    <Button
                        shape="circle"
                        icon="bulb"
                        style={{ boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }}
                        onClick={this.showHint}
                    />
                </Tooltip>
            </div>
        )
    }
}