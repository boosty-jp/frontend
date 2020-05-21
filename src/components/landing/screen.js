import React from "react"
import { Typography } from 'antd';
import ScreenImage from "components/image/screen";

const { Paragraph } = Typography;

const ScreenComponent = () => {
    return (
        <div style={{ backgroundColor: '#F7FAFF' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                <Paragraph style={{ color: 'black', textAlign: 'center', marginBottom: '8px' }}>ブラウザで技術書が読める</Paragraph>
            </div>
            <Paragraph style={{ textAlign: 'center', marginBottom: '40px' }}>閲覧・執筆・販売の機能をブラウザ上で提供します</Paragraph>
            <ScreenImage style={{ width: '70%', maxWidth: '600px', margin: '0 auto' }} />
        </div>
    )
}
export default ScreenComponent