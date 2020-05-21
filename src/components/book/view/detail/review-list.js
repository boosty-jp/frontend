import React from 'react';
import { Typography, Divider, Button } from 'antd';
const { Paragraph } = Typography;

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontSize: 'bold',
    fontColor: 'black',
}


const ReviewBlockList = () => {
    return (
        <div style={{ marginTop: '20px', ...cardStyle }}>
            <p style={{ fontWeight: 'bold', color: 'black', fontSize: '22px', textAlign: 'center', marginBottom: '40px' }}>
                復習ノート
            </p>
            <div style={{ marginTop: '20px', ...cardStyle }}>
                <Paragraph style={{ color: 'black' }}>AZとは「Availability Zone」の略称。AZは地理的に独立しており、冗長構成をとり障害時の切り替えに使われます。</Paragraph>
                <Divider style={{ margin: '8px 0' }} />
                <p style={{ textAlign: 'right', marginBottom: '4px' }}>「AZで冗長構成を組む」より(第2章 ネットワーク)</p>
            </div>
            <div style={{ marginTop: '20px', ...cardStyle }}>
                <Paragraph style={{ color: 'black' }}>リザーブドインスタンスは、長時間かつ特定のAZの利用を予約することで通常のインスタンスから大幅に割引をうけられるインスタンスのことを指します。</Paragraph>
                <Divider style={{ margin: '8px 0' }} />
                <p style={{ textAlign: 'right', marginBottom: '4px' }}>「EC2のインスタンスの種類」より(第1章 コンピューティング)</p>
            </div>
            <div style={{ marginTop: '20px', ...cardStyle }}>
                <img alt="aws" src="https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/images/hibernation-flow.png" style={{ width: '100%', height: 'auto' }} />
                <Divider style={{ margin: '8px 0' }} />
                <p style={{ textAlign: 'right', marginBottom: '4px' }}>「EC2の起動と停止」より(第1章 コンピューティング)</p>
            </div>
            <Button type="primary" ghost shape="round" block style={{ marginTop: '20px', boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }}>もっと見る</Button>
        </div>
    );
}
export default ReviewBlockList