import React from "react"
import { Descriptions } from 'antd';

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontSize: 'bold',
    fontColor: 'black',
}

const BookInfo = () => {
    return (
        <div style={{ marginTop: '20px', ...cardStyle }}>
            <p style={{ fontWeight: 'bold', color: 'black', fontSize: '22px', textAlign: 'center', marginBottom: '40px' }}>
                概要
            </p>
            <Descriptions
                bordered
                column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                style={{ borderRadius: '10rem' }}
            >
                <Descriptions.Item label="発売日">2019年12月20日</Descriptions.Item>
                <Descriptions.Item label="改訂日">2020年2月１日</Descriptions.Item>
                <Descriptions.Item label="セクション数">18</Descriptions.Item>
                <Descriptions.Item label="ページ数">301</Descriptions.Item>
                <Descriptions.Item label="説明">
                    オンプレ→クラウドへの移行が行われている中、AWS(Amazon Web Services)はクラウドを代表するサービスです。AWSのコアサービスを中心に安全で堅牢なアプリケーションを構築できる知識を初心者向けにまとめた教材となります。
<br /><br />インフラやネットワークに関しての知識が無い方でも分かるように基本的な知識も合せて丁寧に解説しております。
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default BookInfo